import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './DockInfo.css';
import Timer from './Timer'
import { deckPropTypes } from './Deck'

const dockPropTypes = {
    id: PropTypes.number.isRequired,
    shipName: PropTypes.string.isRequired,
    shipId: PropTypes.number.isRequired,
    state: PropTypes.number.isRequired,
    finishDate: PropTypes.instanceOf(Date)
}

export default class DockInfo extends Component {
    static propTypes = {
        docks: PropTypes.arrayOf(PropTypes.shape({
            ...dockPropTypes
        })),
        decks: PropTypes.arrayOf(PropTypes.shape({
            ...deckPropTypes
        }))
    }

    renderDock(dock, index) {
        if(dock.state == -1) {
            return (<li key={index}>Dock {dock.id}:
              <span className={styles.disabled}>
                (Locked)
              </span>
            </li>)
        }
        if(dock.state == 0) {
            return (<li key={index}>Dock {dock.id}:
              <span className={styles.disabled}>
                (None)
              </span>
            </li>)
        }
        console.log(dock.finishDate)
        console.log(dock.finishDate - Date.now())

        return (
            <li key={index}>Dock {dock.id}:
              <span className={styles.dockship}>{dock.shipName}</span>
              <Timer key={index}
                     completionMessage={"Ready!"}
                     completionDate={dock.finishDate}
                     notification={{ title: "Repair finished",
                                     body: dock.shipName + " was repaired."}}/>
            </li>
        )
    }

    renderDeckMission(deck, index) {
        if(deck.mission == null) {
            return (<div key={index}>{deck.name}:
              <span className={styles.disabled}>
                (None)
              </span>
            </div>)
        }
        return (
            <div key={index}>{deck.name}:
              <Timer key={index}
                     completionMessage={"Complete"}
                     completionDate={deck.mission.finishDate}
                     notification={{ title: "Mission complete",
                                     body: deck.name + " finished a mission."}}/>
            </div>
        )
    }

    render() {
        console.log(this.props)
        return (
            <div className={styles.header}>
              <h3>Docks</h3>
              {this.props.docks.map((dock, i) => this.renderDock(dock, i))}

              <h3>Missions</h3>
              {this.props.decks.map((deck, i) => this.renderDeckMission(deck, i))}
            </div>
        );
    }
}
