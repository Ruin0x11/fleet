import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './ShipList.css';
import { shipPropTypes } from './ShipList';
import HealthBar from './HealthBar';

export default class Ship extends Component {
    static propTypes = {
        ...shipPropTypes
    }

    constructor(props) {
        super(props);
    }

    render() {
        return <tr>
            <td><span className={styles.ship}>{this.props.name}</span></td>
            <td>{this.props.level}</td>
            <td>{this.props.nowExp}/{this.props.nextExp}</td>
            <td><HealthBar percent={(this.props.nowHp/this.props.maxHp) * 100}/> <small>{this.props.nowHp} / {this.props.maxHp}</small></td>
            <td>{this.props.cond}</td>
            </tr>;
    }

}
