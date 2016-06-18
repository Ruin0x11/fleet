import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';

import { ipcRenderer } from 'electron';
import { ship_info_update } from './actions/shipInfo';
import { port_update } from './actions/port';
import { sortie_update } from './actions/sortie';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

var parsedJSON = require('./api_start2.json');
store.dispatch(ship_info_update(parsedJSON));
parsedJSON = require('./api_port.json');
store.dispatch(port_update(parsedJSON));
parsedJSON = require('./battle3.json');
store.dispatch(sortie_update(parsedJSON));

ipcRenderer.on('dispatch', (_, arg) => {
    switch(arg.type) {
        case 'shipInfo':
            store.dispatch(ship_info_update(arg.data));
            break;
        case 'port':
            store.dispatch(port_update(arg.data));
            break;
        case 'sortie':
            store.dispatch(sortie_update(arg.data));
            break;
        default:
            console.log(arg);
    }
});

render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('fleet')
);
