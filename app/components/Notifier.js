import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './Notifier.css';
import { Notification } from 'react-notification';
var notifier = require('node-notifier');
// String
notifier.notify('Message');

// Object
notifier.notify({
  'title': 'My notification',
  'message': 'Hello, there!'
});

export default class Notifier extends Component {
    static propTypes = {
        message: PropTypes.string.isRequired,
        color: PropTypes.string
    }

    static defaultProps = {
        message: "",
        color: "#CC1B00"
    };

    constructor(props) {
        super(props);

        this.state = {
            isActive: this.props.message == "" ? false : true
        }
    }

    style() {
        return {
            'maxHeight': '0em',
            'overflowY': 'hidden',
            'position': 'relative',
            'bottom': '0em',
            'left': '0em',
            'paddingTop': '0em',
            'paddingBottom': '0em',
            'paddingLeft': '.5em',
            'background': this.props.color,
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
            'maxHeight': '2em',
            'paddingTop': '.5em',
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
            onClick={() => this.setState({ isActive: false })}
                />
                </div>
        );
    }
}
