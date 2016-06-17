import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './FleetBody.css';
import ShipListContainer from '../containers/ShipListContainer';
import NotifierContainer from '../containers/NotifierContainer';
import DockInfoContainer from '../containers/DockInfoContainer';
import FleetTabs from './FleetTabs';

export default class FleetBody extends Component {
  render() {
    return (
        <div className={styles.container}>
            <div className={styles.leftarea}>
                <FleetTabs />
            </div>
                <div className={styles.mainarea}>
                    <div className={styles.message}>
                            <NotifierContainer />
                    <div style={{display: 'flex'}}>
                        <ShipListContainer />
                        <DockInfoContainer />
                    </div>
                    </div>
            </div>
        </div>
    );
  }
}
