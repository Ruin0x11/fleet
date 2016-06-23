import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import FleetView from './FleetView';

export default class Home extends Component {
    render() {
        return (
            <div className={styles.parent}>
              <FleetView />
            </div>
        );
    }
}
