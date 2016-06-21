import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './DockInfo.css';
import Timer from './Timer'

const dockPropTypes = {
    id: PropTypes.number.isRequired,
    shipName: PropTypes.string.isRequired,
    state: PropTypes.number.isRequired,
    completeTime: PropTypes.number.isRequired
}

const missionPropTypes = {
    id: PropTypes.number.isRequired,
    completeTime: PropTypes.number.isRequired,
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

    renderDock(dock) {
        if(dock.state == -1) {
            return (<li>Dock {dock.id}: Locked</li>)
        }
        if(dock.state == 0) {
            return (<li>Dock {dock.id}: None</li>)
        }

        return (
            <li>Dock {dock.id}: {dock.shipName}
            <Timer timestamp={dock.completeTime}
                   notification={{ title: "Repair finished",
                                   body: dock.shipName + " is ready."}}/>
            </li>
        )
    }

    render() {
        console.log(this.props)
        return (
            <div className={styles.header}>
              <ul>
                <h3>Docks</h3>
                {this.props.docks.map(dock => this.renderDock(dock))}
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
