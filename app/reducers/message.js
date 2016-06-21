import { SORTIE_UPDATE } from '../actions/sortie';

import { getShipDamage } from './shared/sortie'

const initialState = {}

export default function messageReducer(state = initialState, action) {
    switch (action.type) {
        case SORTIE_UPDATE:
            return reportSortie(action.data.api_data);
        default:
            return state;
    }
}

function reportSortie(data) {
    var message, color;
    var shipDamage = getShipDamage(data);

    var friendlyDamage = shipDamage.slice(0, 6);
    var friendlyMaxHps = data.api_maxhps.slice(1, 7);
    var friendlyHps = data.api_nowhps.slice(1, 7);

    var enemyDamage = shipDamage.slice(6, 12);
    var enemyHps = data.api_nowhps.slice(7, 13);

    var enemiesLeft = 0;

    for(var i in friendlyDamage) {
        if(friendlyHps[i] - friendlyDamage[i] <= Math.ceil(friendlyMaxHps[i] * 0.25)) {
            return {
                message: "One or more ships heavily damaged. Return immediately."
            }
        }
    }

    for(var i in enemyDamage) {
        if(enemyHps[i] - enemyDamage[i] > 0) {
            enemiesLeft += 1;
        }
    }

    if(enemiesLeft == 0) {
        message = "All enemies defeated. Moving to next stage."
        color = "#009ACD"
    } else {
        message = enemiesLeft + " enemies still remain. Waiting for night battle/retreat."
    }

    return {
        message: message,
        color: color
    }
}
