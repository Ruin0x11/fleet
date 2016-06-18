import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './Ship.css';
import { shipPropTypes } from './ShipList';
import HealthBar from './HealthBar';

export default class Ship extends Component {
    static propTypes = {
        ...shipPropTypes
    }

    constructor(props) {
        super(props);
    }

    getConditionColor(condition) {
        var g, b;
        if(condition > 50) {
            g = 255;
            b = Math.floor(255 * ((50 - condition % 50) / 50));
        }
        else {
            g = Math.floor(255 * (condition / 50));
            b = 0
        }
        return "rgb(255," + g + "," + b + ")"
    }

    render() {
        return <tr>
          <td><span className={styles.name}>
            {this.props.name}
          </span></td>

          <td><span className={styles.desc}>
            Lv.
          </span>
          {this.props.level}
          </td>

          <td style={{ textAlign: 'right'}}>
            <span>
            <span className={styles.desc}>
              TNL
            </span>
            </span>
          </td>
          <td>
              {this.props.nextExp}
          </td>
          <td>
            <HealthBar percent={(this.props.nowHp/this.props.maxHp) * 100} />
            <small>{this.props.nowHp} / {this.props.maxHp}</small>
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
        </tr>;
    }
}
