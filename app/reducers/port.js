import { PORT_UPDATE } from '../actions/port';

const initialState = {
    port_data: {}
}

export default function getLookup(action) {
    var lookup = {};
    var array = action.data.api_data.api_ship
    for (var i = 0, len = array.length; i < len; i++) {
        lookup[array[i].api_id] = array[i];
    }
    return lookup;
}

export default function port(state = initialState, action) {
    switch (action.type) {
    case PORT_UPDATE:
        var lookup = getLookup(action);
        console.log(lookup);
        return Object.assign({}, state, {
            port_data: action.data.api_data.api_deck_port[0].api_ship.map(
                function(id) {
                    return lookup[id];
                }
            )
        })
    default:
        return state
    }
}
