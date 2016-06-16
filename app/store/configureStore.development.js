import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

import { port_update } from '../actions/port';
import { ship_info_update } from '../actions/shipInfo';
import { sortie_update } from '../actions/sortie';

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

const router = routerMiddleware(hashHistory);

const enhancer = compose(
  applyMiddleware(thunk, router, logger),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  var parsedJSON = require('../api_start2.json');
    store.dispatch(ship_info_update(parsedJSON));
  parsedJSON = require('../api_port.json');
    store.dispatch(port_update(parsedJSON));
  parsedJSON = require('../battle3.json');
    store.dispatch(sortie_update(parsedJSON));

  return store;
}
