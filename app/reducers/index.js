import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import portReducer from './port';
import shipInfoReducer from './shipInfo';
import sortieReducer from './sortie';

const rootReducer = combineReducers({
    shipInfo: shipInfoReducer,
    portData: portReducer,
    routing: routing
});

export default rootReducer;
