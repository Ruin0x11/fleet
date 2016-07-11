import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Deck from './Deck'
import Tabs, { Pane } from './Tabs'
import styles from './DeckList.css'
import Timer from './Timer'
import { shipPropTypes } from './Ship'
import { deckPropTypes } from './Deck'

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

    getDeckStatus(deck) {
        var status = "Ready!";
        if (deck.mission) {
            if (deck.mission.finishDate - Date.now() > 0) {
                status = "On Mission";
            }
        }

        if (deck.condRecoveryDate) {
            if (deck.condRecoveryDate - Date.now() > 0) {
                status = "Low Condition";
            }
        }

        for(var i = 0; i < deck.ships.length; i++) {
            var ship = deck.ships[i];
            if(ship.ammo < ship.maxAmmo || ship.fuel < ship.maxFuel) {
                status = "Needs Resupply"
            }
        }

        for(var i = 0; i < deck.ships.length; i++) {
            var ship = deck.ships[i];
            if(ship.isDocked) {
                status = "Ship in Dock"
            }
        }

        for(var i = 0; i < deck.ships.length; i++) {
            var ship = deck.ships[i];
            if(ship.nowHp <= Math.ceil(ship.maxHp * 0.25)) {
                status = "Heavily Damaged"
            }
        }

        console.log(status)
        return status;
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
                             <Timer completionDate={deck.condRecoveryDate}
                                    completionMessage={this.getDeckStatus(deck)}
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

