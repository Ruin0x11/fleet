import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './FleetTabs.css';

export default class FleetTabs extends Component {
  render() {
    return (
        <div className={styles.container}>
            <div className={styles.tab}> <span>dood </span></div>
            <div className={styles.tab}> <span>dood </span></div>
            <div className={styles.tab}> <span>dood </span></div>
            <div className={styles.tab}> <span>dood </span></div>
        </div>
    );
  }
}
