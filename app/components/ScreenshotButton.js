import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './Deck.css';
import Ship from './Ship';
import { ipcRenderer } from 'electron'

export default class ScreenshotButton extends Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        console.log("click")
        ipcRenderer.send('screenshot', {});
    }

    render() {
        return (
            <div onClick={this.handleClick}>
              <i className="fa fa-camera" aria-hidden="true"></i>
            </div>
        );
    }
}
