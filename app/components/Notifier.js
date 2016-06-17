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
    }

    render() {
        return (
                <div>
                <Notification
            isActive={true}
            message={this.props.message}
            dismissAfter={3000}
                />
                </div>
        );
    }
}
