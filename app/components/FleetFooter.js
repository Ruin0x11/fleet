import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './FleetFooter.css';
import ShipListContainer from '../containers/ShipListContainer';

export default class FleetFooter extends Component {
  render() {
    return (
        <div className={styles.container}>
            <div className={styles.indicator}></div>
        </div>
    );
  }
}
