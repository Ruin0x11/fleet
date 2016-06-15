import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './ShipList.css';

export default class Ship extends Component {
    static propTypes = {
        api_id: PropTypes.number.isRequired,
        api_lv: PropTypes.number.isRequired,
        api_exp: PropTypes.array.isRequired,
        api_nowhp: PropTypes.number.isRequired,
        api_maxhp: PropTypes.number.isRequired,
        api_fuel: PropTypes.number.isRequired,
        api_bull: PropTypes.number.isRequired,
        api_cond: PropTypes.number.isRequired,
    }

    constructor(props) {
        super(props);
    }

    render({api_id, api_lv, api_exp, api_nowhp, api_maxhp, api_cond}) {
        return <li>
            <div><span className={styles.ship}>{api_id}</span> {api_lv} {api_exp[0]}/{api_exp[1]} <HealthBar percent={(api_nowhp/api_maxhp) * 100}/> {api_cond}</div>
            </li>;
    }

}
