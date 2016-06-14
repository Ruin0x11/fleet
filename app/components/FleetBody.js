import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './FleetView.css';
import ShipListContainer from '../containers/ShipListContainer';

export default class FleetBody extends Component {
  render() {
    return (
        <div className={styles.container}>
            <ShipListContainer />
        </div>
    );
  }
}
