import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import portReducer from './port';

const rootReducer = combineReducers({
    portData: portReducer,
    routing: routing
});

export default rootReducer;
