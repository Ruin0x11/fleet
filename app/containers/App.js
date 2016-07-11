import React, { Component, PropTypes } from 'react';
import styles from './App.css'

export default class App extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    };

    render() {
        return (
            <div className={styles.parent}>
              <div className={styles.container}>
                {(() => {
                     if (process.env.NODE_ENV == 'production' || process.env.FLEET !== 'ui') {
                         return <webview id="game"
                                         style={{width: 800, height: 480}}
                                         preload="./inject.js"
                                         src="http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/"
                                         ref={node => node && node.setAttribute('plugins', '')}>

                         </webview>;
                     }
                 })()
                }
              </div>
              {this.props.children}
              {
                  (() => {
                      if (process.env.NODE_ENV !== 'production') {
                          const DevTools = require('./DevTools'); // eslint-disable-line global-require
                          return <DevTools />;
                      }
                  })()
              }
            </div>
        );
    }
}
