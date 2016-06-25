import { PORT_UPDATE } from '../actions/port';
import { SORTIE_START_UPDATE } from '../actions/sortieStart';
import { SORTIE_NEXT_UPDATE } from '../actions/sortieNext';
import { BATTLE_UPDATE } from '../actions/sortie';
import { BATTLE_RESULT_UPDATE } from '../actions/battleResult';

import { getShipDamage } from './shared/sortie'

const initialState = { message: "" }

export default function messageReducer(state = initialState, action) {
    switch (action.type) {
        case PORT_UPDATE:
            return { isActive: false };
        case SORTIE_START_UPDATE:
        case SORTIE_NEXT_UPDATE:
            return reportSortieMovement(action.data.api_data);
        case BATTLE_UPDATE:
            return reportBattle(action.data.api_data);
        case BATTLE_RESULT_UPDATE:
            return reportBattleResult(action.data.api_data);
        default:
            return state;
    }
}

function reportSortieMovement(data) {
    var message;
    var rashinFlg = data.api_rashin_flg;
    var rashinId = data.api_rashin_id;
    var next = data.api_next;
    var no = data.api_no;
    message = "flag: " + rashinFlg + " id: " + rashinId + " next: " + next + " no: " + no
    return {
        message: message
    }
}

function reportBattle(data) {
    var message, color;
    var shipDamage = getShipDamage(data);

    var friendlyDamage = shipDamage.slice(0, 6);
    var friendlyMaxHps = data.api_maxhps.slice(1, 7);
    var friendlyHps = data.api_nowhps.slice(1, 7);

    var enemyDamage = shipDamage.slice(6, 12);
    var enemyHps = data.api_nowhps.slice(7, 13);

    var enemiesLeft = 0;

    console.log(shipDamage)
    console.log(data.api_nowhps)

    for(var i in friendlyDamage) {
        console.log(friendlyHps[i] + " " + friendlyDamage[i] + " " + friendlyMaxHps[i])
        if(friendlyHps[i] - friendlyDamage[i] <= Math.ceil(friendlyMaxHps[i] * 0.25)) {
            return {
                message: "One or more ships heavily damaged - Return immediately!",
                color: "#CC1B00"
            }
        }
    }

    for(var i in enemyDamage) {
        console.log(enemyHps[i] + " " + enemyDamage[i])
        if(enemyHps[i] == -1) {
            continue;
        }
        else if(enemyHps[i] - enemyDamage[i] > 0) {
            enemiesLeft += 1;
        }
    }

    if(enemiesLeft == 0) {
        message = "All enemies defeated.";
    } else {
        message = enemiesLeft + " enemies still remain.";
        color = "#Ee7600";
    }

    return {
        message: message,
        isActive: true,
        color: color
    }
}
function reportBattleResult(data) {
    var color, shipId;
    var winRank = data.api_win_rank;
    var getShip = data.api_get_ship;
    var message = "Rank: " + winRank + ".";

    if(getShip) {
        shipId = getShip.api_ship_id
        message = message + " Obtained ship: " + getShip.api_ship_name + " (" + getShip.api_ship_type + ")"
        color = "#EEB422"
    }

    return {
        message: message,
        isActive: true,
        color: color,
        shipId: shipId
    }
}
