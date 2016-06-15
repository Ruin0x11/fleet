import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './FleetHeader.css';

export default class FleetHeader extends Component {
    render() {
        return (
            <div className={styles.header}>
            <div className={styles.row}>
            <div className={styles.pic}>
            <p>名前</p>
            </div>
            <div className={styles.title}>
            <p>lvl <em>14</em></p>
            </div>
            <div className={styles.desc}>
            <p className={styles.miscinfo}>
                Ship slots: 0 <small>/ 100</small>
            </p>
            </div>
            <div className={styles.id}>
                <p className={styles.miscinfo}>
                Buckets: 0
            </p>
            </div>
            </div>

            <div className={styles.row}>
            <div className={styles.pic}>
                <p className={styles.phrase}>惜しいすぎぃ、俺の人生…</p>
            </div>
            <div className={styles.title}>
                <p className={styles.miscinfo}>To next:123/12345</p>
            </div>
            <div className={styles.desc}>
                <p className={styles.miscinfo}>
                Item slots: 0 <small>/ 100</small>
            </p>
            </div>
            <div className={styles.id}>
                <p className={styles.miscinfo}>
                Permits: 0
            </p>
            </div>
            </div>
            </div>
        );
    }
}
