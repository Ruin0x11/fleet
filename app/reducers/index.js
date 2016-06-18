import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import portReducer from './port';
import shipInfoReducer from './shipInfo';

const rootReducer = combineReducers({
    shipInfo: shipInfoReducer,
    portData: portReducer,
    routing: routing
});

export default rootReducer;
