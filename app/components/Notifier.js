import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './Notifier.css';
import { Notification } from 'react-notification';
const notifier = require('node-notifier');

export default class Notifier extends Component {
    static propTypes = {
        message: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        }

        setTimeout(this.desktopNotify, 400);
        setTimeout(this.desktopNotify, 700);
    }

    style() {
        return {
            'maxReight': '0em',
            'overflowY': 'hidden',
            'position': 'relative',
            'bottom': '0em',
            'left': '0em',
            'paddingTop': '0em',
            'paddingBottom': '0em',
            'paddingLeft': '.5em',
            'background': '#Cc1b00',
            'borderRadius': '0px',
            'fontSize': '.9em',
            'WebKittransition': '.5s cubic-bezier(0, 1, 0.5, 1)',
            'MozTransition': '.5s cubic-bezier(0, 1, 0.5, 1)',
            'msTransition': '.5s cubic-bezier(0, 1, 0.5, 1)',
            'Otransition': '.5s cubic-bezier(0, 1, 0.5, 1)',
            'transition': '.5s cubic-bezier(0, 1, 0.5, 1)'
        }
    }

    activeStyle() {
        return Object.assign({}, this.style(), {
            'max-height': '2em',
            'padding-top': '.5em',
            'height': '2em'
        })
    }

    toggleNotification() {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    desktopNotify() {
        notifier.notify({
            title: 'Asd',
            message: 'Fgh',
            sound: true
        });
    }

    render() {
        const { isActive } = this.state;
        return (
                <div>
                <Notification
            isActive={this.state.isActive}
            activeBarStyle={this.activeStyle()}
            barStyle={this.style()}
            message={this.props.message}
            dismissAfter={2000}
            onDismiss={this.toggleNotification.bind(this)}
            onClick={() =>  this.setState({ isActive: false })}
                />
                </div>
        );
    }
}
