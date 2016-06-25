import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './Ship.css';
import HealthBar from './HealthBar';

export const shipPropTypes = {
    id: PropTypes.number.isRequired,
    ship_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    nowExp: PropTypes.number.isRequired,
    nextExp: PropTypes.number.isRequired,
    nowHp: PropTypes.number.isRequired,
    maxHp: PropTypes.number.isRequired,
    fuel: PropTypes.number.isRequired,
    maxFuel: PropTypes.number.isRequired,
    ammo: PropTypes.number.isRequired,
    maxAmmo: PropTypes.number.isRequired,
    slots: PropTypes.array.isRequired,
    cond: PropTypes.number.isRequired,
    dockTime: PropTypes.number.isRequired,
    isDocked: PropTypes.bool.isRequired
}

export default class Ship extends Component {
    static propTypes = {
        ...shipPropTypes
    }

    constructor(props) {
        super(props);
    }

    getConditionColor(condition) {
        var g, b;
        if (condition < 20) {
            g = 0;
            b = 0;
        }
        else if (condition < 30) {
            g = 165;
            b = 0
        }
        else if (condition > 49) {
            g = 255;
            b = 0;
        }
        else {
            g = 255;
            b = 255;
        }

        return "rgb(255," + g + "," + b + ")"
    }

    getBackgroundClass() {
        if (this.props.isDocked) {
            return styles.important;
        } else if (this.props.canUpgrade) {
            return styles.upgradeable;
        }
        return '';
    }

    render() {
        console.log(this.props.dockTime);
        return (
            <tr className={this.getBackgroundClass()}>
              <td style={{ width: '4.5em', paddingRight: '.5em'}}>
                <span className={styles.name}>
                {this.props.name}
                </span>
              </td>

              <td><span className={styles.desc}>
                Lv.
              </span>
              {this.props.level}
              </td>

              <td style={{ width: '5em', paddingRight: '.5em'}}>
                <span className={styles.desc}>
                  TNL
                </span>
                {this.props.nextExp}
              </td>
              <td>
                <HealthBar percent={(this.props.nowHp/this.props.maxHp) * 100} />
                <small>{this.props.nowHp.toFixed(0)} / {this.props.maxHp}</small>
              </td>
              <td>
                <span className={styles.desc}>
                  CND
                </span>
                {this.props.cond}
                <div style= {{ background: this.getConditionColor(this.props.cond)}}
                     className={styles.condition}>
                </div>
              </td>
              <td>
                {this.props.fuel}<span className={styles.desc}> / {this.props.maxFuel}</span>
                {this.props.ammo}<span className={styles.desc}> / {this.props.maxAmmo}</span>
              </td>
            </tr>
        );
    }
}
