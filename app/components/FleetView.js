import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './FleetView.css';
import FleetHeaderContainer from '../containers/FleetHeaderContainer';
import FleetBody from './FleetBody';
import FleetFooter from './FleetFooter';

export default class FleetView extends Component {
  render() {
    return (
        <div className={styles.container}>
            <FleetHeaderContainer />
            <FleetBody />
            <FleetFooter />
        </div>
    );
  }
}
