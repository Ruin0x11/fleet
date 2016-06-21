import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './DockInfo.css';
import Timer from './Timer'

const dockPropTypes = {
    id: PropTypes.number.isRequired,
    shipName: PropTypes.string.isRequired,
    state: PropTypes.number.isRequired,
    completionDate: PropTypes.instanceOf(Date)
}

const missionPropTypes = {
    id: PropTypes.number.isRequired,
    completionDate: PropTypes.instanceOf(Date),
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
            return (<li key={index}>Dock {dock.id}: Locked</li>)
        }
        if(dock.state == 0) {
            return (<li key={index}>Dock {dock.id}: None</li>)
        }

        return (
            <li key={index}>Dock {dock.id}: {dock.shipName}
            <Timer key={index}
                   completionMessage={"Ready!"}
                   completionDate={dock.completionDate}
                   notification={{ title: "Repair finished",
                                   body: dock.shipName + " was repaired."}}/>
            </li>
        )
    }

    render() {
        console.log(this.props)
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
