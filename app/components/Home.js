import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import FleetView from './FleetView';

export default class Home extends Component {
    render() {
        return (
            <div className={styles.parent}>
              <div style={{ margin: "0 auto", width: 800, height: 480 }} className={styles.container}>
                {(() => {
                     if (process.env.FLEET == 'run') {
                         return <webview id="game" style={{width: 800, height: 480}} preload="./inject.js" src="http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/" ref={node => node && node.setAttribute('plugins', '')}></webview>;
                     }
                 })()
                }
              </div>
              <FleetView />
            </div>
        );
    }
}
