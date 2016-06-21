import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

function getRemainingTime(timestamp) {
    return new Date(((timestamp * 1000) - Date.now()))
}

function getTimeMessage(date) {
    if (date <= 0) {
        return "Complete!"
    } else {
        var seconds = '0' + Math.floor( (date/1000) % 60 );
        var minutes = '0' + Math.floor( (date/1000/60) % 60 );
        var hours = '0' + Math.floor( (date/(1000*60*60)) % 24 );

        // Will display time in 10:30:23 format
        var formattedTime = hours.slice(-2) + ':' + minutes.slice(-2) + ':' + seconds.slice(-2);
        return formattedTime;
    }
}

export default class Timer extends Component {
    static propTypes = {
        timestamp: PropTypes.number.isRequired,
        notification: PropTypes.shape({
            title: PropTypes.string,
            body: PropTypes.string
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            finished: false
        }
    }

    componentDidMount() {
        this.setInterval();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps) {
        const remaining = getRemainingTime(nextProps.timestamp);
        if (remaining > 0) {
            this.setInterval();
        }
    }

    setInterval() {
        this.interval = setInterval(this.forceUpdate.bind(this), this.props.updateInterval || 1000);
    }

    render() {
        const { timestamp } = this.props;
        var message;

        if(timestamp == 0) {
            message = ""
        } else {
            const time = getRemainingTime(timestamp)
            if(time <= 0) {
                if(typeof(this.props.notification) != 'undefined') {
                    let notification = new Notification(
                        this.props.notification.title, {
                            body: this.props.notification.body
                        });
                    clearInterval(this.interval);
                }
            }
            message = getTimeMessage(time);
        }

        return (
            <span>{message}</span>
        );
    }
}

function mapStateToProps(state) {
    const { timestamp } = state;
    return { timestamp };
}

Timer = connect(mapStateToProps)(Timer);
