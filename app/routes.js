import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import SettingsContainer from './containers/SettingsContainer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/settings" component={SettingsContainer}/>
  </Route>
);
