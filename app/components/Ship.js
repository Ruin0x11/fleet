import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './Ship.css';
import { shipPropTypes } from './DeckList';
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

          <td style={{ width: '5em', paddingRight: '.5em'}}>
            <span className={styles.desc}>
              TNL
            </span>
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
