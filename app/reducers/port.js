import { PORT_UPDATE } from '../actions/port';
import { SORTIE_UPDATE } from '../actions/sortie';
import { BATTLE_RESULT_UPDATE } from '../actions/battleResult';

const initialState = {}

export default function portReducer(state = initialState, action) {
    switch (action.type) {
        case PORT_UPDATE:
            return action.data.api_data;
        case SORTIE_UPDATE:
            return updateFleetDamage(state, action.data.api_data);
        case BATTLE_RESULT_UPDATE:
            return updateGainedExperience(state, action.data.api_data)
        default:
            return state;
    }
}

function getShip(shipList, index) {
    return shipList.find(function (d) {
        return d.api_id === index;
    });
}

function updateFleetDamage(state, data) {
    //TODO: normalize
    var fleet = state.api_deck_port[0].api_ship;
    // clone array
    var shipList = state.api_ship.slice();
    var damage = getShipDamage(data);

    for(var i = 0, len = fleet.length; i < len; i++) {
        var ship = getShip(shipList, fleet[i])
        ship.api_nowhp -= damage[i];
    }

    return Object.assign({}, state, {
        api_ship: shipList
    })
}

function getShipDamage(data) {
    var shipDamage = getBlankDamage();
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

function getBlankDamage() {
    // initialize damage to zero for all 6 ships
    return Array.apply(null, Array(6)).map(Number.prototype.valueOf,0);
}

function getKoukuDamage(data) {
    var kouku = data.api_kouku;
    if(!kouku) {
        return getBlankDamage();
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
        return getBlankDamage();
    }

    var fdam = opening_atack.api_fdam;
    // remove leading -1
    fdam.shift();
    return fdam;
}

function getSingleHougekiDamage(hougeki) {
    var df_list = hougeki.api_df_list;
    var damage = hougeki.api_damage;

    var shipDamage = getBlankDamage();
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
    var shipDamage = getBlankDamage();

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
        return getBlankDamage();
    }

    var fdam = raigeki.api_fdam;
    // remove leading -1
    fdam.shift();
    return fdam;
}

function updateGainedExperience(state, data) {
    const gainedPlayerExp = data.api_get_exp;
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

    return Object.assign({}, state, {
        api_ship: shipList
    })
}
