import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './DockInfo.css';

export const dockInfoPropTypes = {
    nickname: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    rank: PropTypes.number.isRequired,
    numChara: PropTypes.number.isRequired,
    maxChara: PropTypes.number.isRequired,
    maxEquip: PropTypes.number.isRequired,
}

export default class FleetHeader extends Component {
    static propTypes = {
    }

    getDefaultProps () {
        return {
            nickname: "",
            comment: "",
            level: -1,
            rank: -1,
            numChara: -1,
            maxChara: -1,
            maxEquip: -1
        };
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <table className={styles.header}>
                <tbody>
                </tbody>
                </table>
        );
    }
}
