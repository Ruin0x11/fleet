import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Settings.css';

export default class Settings extends Component {
    render() {
        return (
            <div>
              <input type="text" value="Hello!" />
              <Link to="/">Back</Link>
            </div>
        );
    }
}
