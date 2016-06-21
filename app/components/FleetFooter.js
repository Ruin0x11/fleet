import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './FleetFooter.css';
import DeckListContainer from '../containers/DeckListContainer';
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
