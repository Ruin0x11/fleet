import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './FleetHeader.css';

export default class FleetHeader extends Component {
  render() {
    return (
        <div className={styles.header}>
            <div className="row">
                <div className="col-xs-4">dood</div>
                // <small>nothing</small>
            </div>
            <div className="row">
                <div className="col-xs-4">dood</div>
            </div>
            <div className="row">
                <div className="col-xs-4">dood</div>
                // <small>nothing</small>
            </div>

        </div>
    );
  }
}
