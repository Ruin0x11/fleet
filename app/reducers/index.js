import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import port from './port';

const rootReducer = combineReducers({
  // counter,
    port,
    routing
});

export default rootReducer;
