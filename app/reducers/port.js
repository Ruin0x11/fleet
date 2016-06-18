import { PORT_UPDATE } from '../actions/port';
import { SORTIE_UPDATE } from '../actions/sortie';
import { BATTLE_RESULT_UPDATE } from '../actions/battleResult';

const initialState = {}

export default function portReducer(state = initialState, action) {
    switch (action.type) {
        case PORT_UPDATE:
            return action.data.api_data;
        case SORTIE_UPDATE:
            return updateFromBattle(state, action.data.api_data)
        case BATTLE_RESULT_UPDATE:
            return updateFromResult(state, action.data.api_data)
        default:
            return state;
    }
}

function getShip(shipList, index) {
    return shipList.find(function (d) {
        return d.api_id === index;
    });
}

function updateFromBattle(state, data) {
    state = updateFleetDamage(state, data);
    state = updateCondition(state, data, getConditionFromBattle)
    return state
}

function updateFromResult(state, data) {
    state = updateGainedExperience(state, data);
    state = updateCondition(state, data, getConditionFromResult)
    return state
}

function updateCondition(state, data, func) {
    var fleet = state.api_deck_port[0].api_ship;
    var shipList = state.api_ship.slice();
    var conditionChange = func(data);

    for(var i = 0, len = fleet.length; i < len; i++) {
        var ship = getShip(shipList, fleet[i])
        ship.api_cond += conditionChange[i];
        console.log(ship.api_cond)
        if(ship.api_cond > 100) {
            ship.api_cond = 100;
        }
        else if(ship.api_cond < 0) {
            ship.api_cond = 0;
        }
    }

    return Object.assign({}, state, {
        api_ship: shipList
    })
}

function getConditionFromBattle(data) {
    var gainedCondition;
    if(data.api_midnight_flag > 0) {
        gainedCondition = -2;
    } else {
        gainedCondition = -3;
    }

    return getInitializedArray(gainedCondition);
}

function getConditionFromResult(data) {
    var gainedCondition;

    // http://wikiwiki.jp/kancolle/?%C8%E8%CF%AB%C5%D9#q06a71aa
    switch(data.api_win_rank) {
        case "S":
            gainedCondition = 4;
            break;
        case "A":
            gainedCondition = 3;
            break;
        case "B":
            gainedCondition = 2;
            break;
        case "C":
            gainedCondition = 1;
            break;
        case "D":
        case "E":
        default:
            gainedCondition = 0;
    }

    var conditionArray = getInitializedArray(gainedCondition);

    // flagship
    if(data.api_win_rank != "D" && data.api_win_rank != "E") {
        conditionArray[0] += 3;
    }

    // arrays are 1-indexed
    conditionArray[data.api_mvp-1] += 10
            console.log(conditionArray)

    return conditionArray;
}

function updateFleetDamage(state, data) {
    var fleet = state.api_deck_port[0].api_ship;
    var shipList = state.api_ship.slice();
    var damage = getShipDamage(data);

    for(var i = 0, len = fleet.length; i < len; i++) {
        var ship = getShip(shipList, fleet[i])
        ship.api_nowhp -= damage[i];
        if(ship.api_nowhp < 0) {
            ship.api_nowhp = 0;
        }
    }

    return Object.assign({}, state, {
        api_ship: shipList
    });
}

function getShipDamage(data) {
    var shipDamage = getInitializedArray(0);
    shipDamage = mergeDamages(shipDamage, getKoukuDamage(data));
    shipDamage = mergeDamages(shipDamage, getOpeningDamage(data));
    shipDamage = mergeDamages(shipDamage, getHougekiDamage(data));
    shipDamage = mergeDamages(shipDamage, getRaigekiDamage(data));

    return shipDamage;
}

function mergeDamages(damageA, damageB) {
    return damageA.map(function (damage, i) {
        return damageB[i] + damage;
    });
}

function getInitializedArray(value) {
    // initialize array to 'value' for all 6 ships
    return Array.apply(null, Array(6)).map(Number.prototype.valueOf,value);
}

function getKoukuDamage(data) {
    var kouku = data.api_kouku;
    if(!kouku) {
        return getInitializedArray(0);
    }
    var fdam = kouku.api_stage3.api_fdam;
    // remove leading -1
    fdam.shift();
    return fdam;
}

function getOpeningDamage(data) {
    // attack is misspelled as "atack"
    var opening_atack = data.api_opening_atack;
    if(!opening_atack) {
        return getInitializedArray(0);
    }

    var fdam = opening_atack.api_fdam;
    // remove leading -1
    fdam.shift();
    return fdam;
}

function getSingleHougekiDamage(hougeki) {
    if(!hougeki) {
        return getInitializedArray(0);
    }
    var df_list = hougeki.api_df_list;
    var damage = hougeki.api_damage;

    var shipDamage = getInitializedArray(0);
    for (var i = 0, len = df_list.length; i < len; i++) {
        // TODO: find case with multiple damages in single attack
        var target = df_list[i][0];
        var targetDamage = damage[i][0]
        // 7 or greater = enemy ship
        if(target < 7) {
            // the arrays are 1-indexed, so subtract 1
            shipDamage[target-1] += targetDamage;
        }
    }

    return shipDamage
}

function getHougekiDamage(data) {
    var shipDamage = getInitializedArray(0);

    var stages = ["api_hougeki1", "api_hougeki2", "api_hougeki3"]

    for(var i = 0, len = stages.length; i < len; i++) {
        if(data[stages[i]]) {
            var currentDamage = getSingleHougekiDamage(data[stages[i]])
            shipDamage = mergeDamages(shipDamage, currentDamage)
        }
    }
    return shipDamage;
}

function getRaigekiDamage(data) {
    var raigeki = data.api_raigeki;
    if(!raigeki) {
        return getInitializedArray(0);
    }

    var fdam = raigeki.api_fdam;
    // remove leading -1
    fdam.shift();
    return fdam;
}

function updateGainedExperience(state, data) {
    var gainedShipExp = data.api_get_ship_exp;
    var shipIds = data.api_ship_id;
    const shipExpTables = data.api_get_exp_lvup;

    gainedShipExp.shift();
    shipIds.shift();

    var shipList = state.api_ship.slice();

    for(var i = 0, len = shipIds.length; i < len; i++) {
        var ship = getShip(shipList, shipIds[i])
        if(typeof(ship) == 'undefined') {
            continue;
        }
        var expTable = shipExpTables[i];
        var gainedExp = gainedShipExp[i];
        // the first entry in each table is the ship's current experience.
        // the second entry is the experience level where a level up occurs.
        // if a level up occurs by adding the gained exp to current,
        // the next experience value until level up is the next entry in the table.
        // so, remove the amount that was reached from the 'exp to next' value
        // until no more entries are in the table.
        var lastMax = 0;
        var expToNext = expTable[0] + gainedExp;
        for(var j = 1, lenb = expTable.length; j < expTable.length; j++) {
            expToNext -= lastMax;
            lastMax = expTable[j];
        }

        ship.api_exp[0] += gainedExp; // total exp
        ship.api_exp[1] = expToNext;  // exp to next level
    }

    var apiBasic = state.api_basic
    const gainedPlayerExp = data.api_get_exp;
    var currentPlayerExp = data.api_member_exp + gainedPlayerExp;
    apiBasic.api_experience = currentPlayerExp;

    return Object.assign({}, state, {
        api_ship: shipList,
        api_basic: apiBasic
    })
}
