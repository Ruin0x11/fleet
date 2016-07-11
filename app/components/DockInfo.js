import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './DockInfo.css';
import Timer from './Timer'

const dockPropTypes = {
    id: PropTypes.number.isRequired,
    shipName: PropTypes.string.isRequired,
    shipId: PropTypes.number.isRequired,
    state: PropTypes.number.isRequired,
    finishDate: PropTypes.instanceOf(Date)
}

const missionPropTypes = {
    id: PropTypes.number.isRequired,
    finishDate: PropTypes.instanceOf(Date),
    deckName: PropTypes.string.isRequired
}

export default class DockInfo extends Component {
    static propTypes = {
        docks: PropTypes.arrayOf(PropTypes.shape({
            ...dockPropTypes
        })),
        missions: PropTypes.arrayOf(PropTypes.shape({
            ...missionPropTypes
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

    render() {
        return (
            <div className={styles.header}>
              <h3>Docks</h3>
              <ul>
                {this.props.docks.map((dock, i) => this.renderDock(dock, i))}
              </ul>
              <ul>
                <h3>Missions</h3>
                <li>1: 12:34:56</li>
                <li>2: 12:34:56</li>
                <li>3: 12:34:56</li>
                <li>4: 12:34:56</li>
              </ul>
            </div>
        );
    }
}
