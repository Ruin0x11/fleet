import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


export default class ShipList extends Component {
    constructor(props) {
        super(props);
    }


    renderShip({name, health}) {
        return <li>{name}: {health}</li>;
    }

    render() {
        return <ul> {this.props.ships.map(this.renderShip)} </ul>;
    }
}
