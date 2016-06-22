import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Deck from './Deck'
import Tabs, { Pane } from './Tabs'
import styles from './DeckList.css'
import Timer from './Timer'

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
}

export const deckPropTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ships: PropTypes.arrayOf(PropTypes.shape({
        ...shipPropTypes
    })).isRequired,
    missions: PropTypes.array.isRequired,
    dateWhenReady: PropTypes.instanceOf(Date)
}

export default class DeckList extends Component {
    static propTypes = {
        decks: PropTypes.arrayOf(PropTypes.shape({
            ...deckPropTypes
        }).isRequired).isRequired,
        currentDeck: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.currentDeck == -1) {
            return (<div></div>);
        }

        return (
            <div>
              <Tabs selected={0}>
                {this.props.decks.map(function(deck) {
                     return (
                         <Pane
                             label={<div>
                           <div>{deck.name}</div>
                           <div style={{ fontSize: "11px" }}>
                             <Timer completionDate={deck.dateWhenReady}
                                    completionMessage={"Ready"}
                                    notification={{ title: "Ready to Sortie",
                                                    body: deck.name + " can sortie again."}}/>
                           </div>
                             </div>}
                             key={deck.id}
                         >
                             <Deck key={deck.id} {...deck}/>
                         </Pane>
                     );
                 }.bind(this))}
              </Tabs>
            </div>
        )
    }
}

