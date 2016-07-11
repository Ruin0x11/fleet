import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './FleetHeader.css';
import ScreenshotButton from './ScreenshotButton';

export const playerDataPropTypes = {
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
        ...playerDataPropTypes
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table className={styles.header}>
              <tbody>
                <tr className={styles.row}>
                  <td className={styles.pic}>
                    {this.props.nickname}
                  </td>
                  <td className={styles.pic}>
                    <span className={styles.phrase}>{this.props.comment}</span>
                  </td>
                  <td className={styles.id}>
                    Lv. <em>{this.props.level}</em>
                  </td>
                  <td className={styles.title}>
                    <span className={styles.miscinfo}>EXP:{this.props.experience}</span>
                  </td>
                  <td className={styles.title}>
                    <span className={styles.miscinfo}>
                      Ships: {this.props.numChara} <small>/ {this.props.maxChara}</small>
                    </span>
                  </td>
                  <td className={styles.title}>
                    <span className={styles.miscinfo}>
                      Items: 0 <small>/ {this.props.maxEquip}</small>
                    </span>
                  </td>
                  <td className={styles.id}>
                      <Link to="/settings">
                        <i className="fa fa-cog" aria-hidden="true"></i>
                      </Link>
                  </td>
                  <td className={styles.id}>
                    <ScreenshotButton/>
                  </td>
                </tr>
              </tbody>
            </table>
        );
    }
}
