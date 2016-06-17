import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './FleetBody.css';
import ShipListContainer from '../containers/ShipListContainer';
import NotifierContainer from '../containers/NotifierContainer';
import FleetTabs from './FleetTabs';

export default class FleetBody extends Component {
  render() {
    return (
        <div className={styles.container}>
            <div className={styles.sidearea}>
                <FleetTabs />
            </div>
            <div className={styles.mainarea}>
                <NotifierContainer />
                <ShipListContainer />
            </div>
        </div>
    );
  }
}
