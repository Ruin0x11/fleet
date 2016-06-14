import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import FleetView from './FleetView';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
            <div class="indicator"></div>
            <div style={{width: 800, height: 480}}>
            </div>
        </div>
        <FleetView />
      </div>
    );
  }
}
