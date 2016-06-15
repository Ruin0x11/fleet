import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './ShipList.css';
import HealthBar from './HealthBar';
import Ship from './Ship';

export const shipPropTypes = {
    id: PropTypes.number.isRequired,
    ship_id: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    nowExp: PropTypes.number.isRequired,
    nextExp: PropTypes.number.isRequired,
    nowHp: PropTypes.number.isRequired,
    maxHp: PropTypes.number.isRequired,
    fuel: PropTypes.number.isRequired,
    ammo: PropTypes.number.isRequired,
    slots: PropTypes.array.isRequired,
    cond: PropTypes.number.isRequired,
}

export const deckPropTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ships: PropTypes.arrayOf(PropTypes.shape({
        ...shipPropTypes
    })).isRequired,
    missions: PropTypes.array.isRequired,
}


export default class ShipList extends Component {
    static propTypes = {
        decks: PropTypes.arrayOf(PropTypes.shape({
            ...deckPropTypes
        }).isRequired).isRequired,
        currentDeck: PropTypes.number.isRequired
    }

    constructor(props) {
        console.log(props)
        super(props);
    }

    render() {
        // if(this.decks.length == 0) {
        //     return <br>;
        // }
        var ships = this.props.decks[this.props.currentDeck].ships;
        return <table>{ships.map(ship => <Ship key={ship.id} {...ship}/>)}</table>;
    }
}

