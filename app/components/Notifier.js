import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './Notifier.css';
import { Notification } from 'react-notification';

export default class Notifier extends Component {
    static propTypes = {
        message: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            isActive: true
        }
    }

    style() {
        return {
            'max-height': '0',
            'overflow-y': 'hidden',
            'position': 'relative',
            'bottom': '0em',
            'left': '0em',
            'padding-top': '0em',
            'padding-bottom': '0em',
            'padding-left': '.5em',
            'background': '#Cc1b00',
            'border-radius': '0px',
            'font-size': '.9em',
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
