import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './Deck.css';
import Ship from './Ship';
import { deckPropTypes } from './DeckList'

export default class Deck extends Component {
    static propTypes = {
        ...deckPropTypes
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
