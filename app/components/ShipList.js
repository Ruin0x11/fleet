import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './ShipList.css';
import HealthBar from './HealthBar';
import Ship from './Ship';

export default class ShipList extends Component {
    static propTypes = {
        ships: PropTypes.arrayOf(PropTypes.shape({
            api_id: PropTypes.number.isRequired,
            api_lv: PropTypes.number.isRequired,
            api_exp: PropTypes.array.isRequired,
            api_nowhp: PropTypes.number.isRequired,
            api_maxhp: PropTypes.number.isRequired,
            api_fuel: PropTypes.number.isRequired,
            api_bull: PropTypes.number.isRequired,
            api_cond: PropTypes.number.isRequired,
        }).isRequired).isRequired,
    }

    constructor(props) {
        super(props);
    }

    render() {
        return <ul>
         </ul>;
    }
}

            // {this.ships.map(ship =>
            //            <Ship
            //            key={ship.id}
            //            {...ship}
            //            />
            //           )}
