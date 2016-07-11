import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import styles from './Notifier.css';
import { Notification } from 'react-notification';

export default class Notifier extends Component {
    static propTypes = {
        message: PropTypes.string,
        isActive: PropTypes.bool,
        color: PropTypes.string
    }

    static defaultProps = {
        message: "",
        isActive: true,
        color: "#009ACD"
    };

    constructor(props) {
        super(props);

        this.state = {
            isActive: this.props.isActive
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
            <Notification
            isActive={true}
            activeBarStyle={this.activeStyle()}
            barStyle={this.style()}
            message={this.props.message}
            dismissAfter={200}
            onDismiss={this.toggleNotification.bind(this)}
            onClick={() => this.setState({ isActive: false })}
            />
        );
    }
}
