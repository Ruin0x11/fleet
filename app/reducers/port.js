import { PORT_UPDATE } from '../actions/port';

const initialState = {
    portData: {}
}

export default function portReducer(state = initialState, action) {
    switch (action.type) {
    case PORT_UPDATE:
        return action.data;
    default:
        return state;
    }
}
