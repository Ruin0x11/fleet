import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import FleetView from './FleetView';


// <webview id="game" style={{width: 800, height: 480}} preload="./inject.js" src="http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/" ref={node => node && node.setAttribute('plugins', '')}></webview>

export default class Home extends Component {
  render() {
    return (
      <div>
        <div style={{width: 800, height: 480}} className={styles.container}>
        </div>
        <FleetView />
      </div>
    );
  }
}
