import { PORT_UPDATE } from '../actions/port';
import { BATTLE_UPDATE } from '../actions/sortie';
import { SORTIE_START_UPDATE } from '../actions/sortieStart';
import { BATTLE_RESULT_UPDATE } from '../actions/battleResult';
import { DOCK_UPDATE } from '../actions/dock';

import { getShipDamage } from './shared/sortie'
import { getInitializedArray } from './shared/general'

const initialState = {}

export default function portReducer(state = initialState, action) {
    switch (action.type) {
        case PORT_UPDATE:
            return action.data.api_data;
        case DOCK_UPDATE:
            return updateDock(state, action.data.api_data)
        case SORTIE_START_UPDATE:
            return updateFromSortieStart(state)
        case BATTLE_UPDATE:
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

function updateDock(state, data) {
    return Object.assign({}, state, {
        api_ndock: data
    })
}

function updateFromSortieStart(state) {
    state = updateCondition(state, {}, getConditionFromSortieStart);
    return state
}

function updateFromBattle(state, data) {
    state = updateFleetDamage(state, data);
    state = updateCondition(state, data, getConditionFromBattle);
    return state;
}

function updateFromResult(state, data) {
    state = updateGainedExperience(state, data);
    state = updateCondition(state, data, getConditionFromResult);
    return state;
}

function updateCondition(state, apiData, conditionFunc) {
    // TODO: detect which deck is out
    var fleet = state.api_deck_port[0].api_ship;
    var shipList = state.api_ship.slice();
    var conditionChange = conditionFunc(apiData);

    for(var i = 0, len = fleet.length; i < len; i++) {
        var ship = getShip(shipList, fleet[i])
        ship.api_cond += conditionChange[i];
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

function getConditionFromSortieStart(data) {
    return getInitializedArray(-15);
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

    return conditionArray;
}

function updateFleetDamage(state, data) {
    // TODO: detect which deck is out
    var fleet = state.api_deck_port[0].api_ship;
    var shipList = state.api_ship.slice();
    var damage = getShipDamage(data);
    var nowHps = data.api_nowhps.slice(1,7);

    for(var i = 0, len = fleet.length; i < len; i++) {
        var ship = getShip(shipList, fleet[i])
        ship.api_nowhp = nowHps[i] - damage[i];
        if(ship.api_nowhp < 0) {
            ship.api_nowhp = 0;
        }
    }

    return Object.assign({}, state, {
        api_ship: shipList
    });
}

function updateGainedExperience(state, data) {
    var gainedShipExp = data.api_get_ship_exp;
    var fleet = state.api_deck_port[0].api_ship;
    const shipExpTables = data.api_get_exp_lvup;

    gainedShipExp.shift();

    var shipList = state.api_ship.slice();

    for(var i = 0, len = fleet.length; i < len; i++) {
        var ship = getShip(shipList, fleet[i])
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
        var expToNext = expTable[1] - expTable[0];
        var expLeft = gainedExp;
        for(var j = 2, lenb = expTable.length; j < expTable.length; j++) {
            expLeft -= expToNext
            expToNext = expTable[j] - expTable[j-1];
            ship.api_lv += 1;
        }
        expToNext -= expLeft;

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
