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
import { battle_update } from './actions/sortie';
import { sortie_start_update } from './actions/sortieStart';
import { battle_result_update } from './actions/battleResult';
import { dock_update } from './actions/dock';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

var parsedJSON = require('../test/mocks/shipInfoMock.json');
store.dispatch(ship_info_update(parsedJSON));
parsedJSON = require('../test/mocks/portDataMock.json');
store.dispatch(port_update(parsedJSON));
parsedJSON = require('../test/mocks/sortieStartDataMock.json');
store.dispatch(sortie_start_update(parsedJSON));
parsedJSON = require('../test/mocks/sortieAllEnemiesDestroyed.json');
store.dispatch(battle_update(parsedJSON));
parsedJSON = require('../test/mocks/battleResultDataMock.json');
store.dispatch(battle_result_update(parsedJSON));

ipcRenderer.on('dispatch', (_, arg) => {
    console.log(arg.type)
    switch(arg.type) {
        case 'shipInfo':
            store.dispatch(ship_info_update(arg.data));
            break;
        case 'port':
            store.dispatch(port_update(arg.data));
            break;
        case 'battle':
            store.dispatch(battle_update(arg.data));
            break;
        case 'battleResult':
            store.dispatch(battle_result_update(arg.data));
            break;
        case 'sortieStart':
            store.dispatch(sortie_start_update(arg.data));
            break;
        case 'sortieStart':
            store.dispatch(sortie_next_update(arg.data));
            break;
        case 'dock':
            store.dispatch(dock_update(arg.data));
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
