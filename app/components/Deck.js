import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './Deck.css';
import Ship, { shipPropTypes } from './Ship';

export const deckPropTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ships: PropTypes.arrayOf(PropTypes.shape({
        ...shipPropTypes
    })).isRequired,
    mission: PropTypes.shape({
        id: PropTypes.number,
        finishDate: PropTypes.instanceOf(Date)
    }),
    condRecoveryDate: PropTypes.instanceOf(Date)
}

export default class Deck extends Component {
    static propTypes = {
        ..deckPropTypes
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table className={styles.container}>
              <tbody>{this.props.ships.map(ship => <Ship key={ship.id} {...ship}/>)}
              </tbody>
            </table>
        );
    }
}
