import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './FleetFooter.css';
import ShipListContainer from '../containers/ShipListContainer';
import NotifierContainer from '../containers/NotifierContainer';

export default class FleetFooter extends Component {
  render() {
    return (
        <div className={styles.container}>
            <NotifierContainer />
            <div className={styles.indicator}></div>
        </div>
    );
  }
}
