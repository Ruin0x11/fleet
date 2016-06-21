import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import portReducer from './port';
import shipInfoReducer from './shipInfo';
import messageReducer from './message';

const rootReducer = combineReducers({
    shipInfo: shipInfoReducer,
    portData: portReducer,
    messageData: messageReducer,
    routing: routing
});

export default rootReducer;
