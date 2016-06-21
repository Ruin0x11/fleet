import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default class Timer extends Component {
    static propTypes = {
        completionDate: PropTypes.instanceOf(Date),
        notification: PropTypes.shape({
            title: PropTypes.string,
            body: PropTypes.string
        }),
        completionMessage: PropTypes.string
    }

    static defaultProps = {
        completionDate: null,
        completionMessage: "Complete!"
    }

    constructor(props) {
        super(props);

        this.state = {
            finished: false,
            message: "..."
        }
    }


    getTimeMessage(date) {
        if (date <= 0) {
            return this.props.completionMessage;
        } else {
            var seconds = '0' + Math.floor( (date/1000) % 60 );
            var minutes = '0' + Math.floor( (date/1000/60) % 60 );
            var hours = '0' + Math.floor( (date/(1000*60*60)) % 24 );

            // Will display time in 10:30:23 format
            var formattedTime = hours.slice(-2) + ':' + minutes.slice(-2) + ':' + seconds.slice(-2);
            return formattedTime;
        }
    }

    componentDidMount() {
        this.setInterval();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps) {
        const remaining = nextProps.completionDate - Date.now()
        if (remaining > 0) {
            this.setInterval();
        }
    }

    setInterval() {
        this.interval = setInterval(this.tick.bind(this), this.props.updateInterval || 1000);
    }

    tick() {
        const { completionDate } = this.props;
        var message;

        if(!completionDate) {
            message = "..."
        } else {
            const timeRemaining = this.props.completionDate - Date.now();
            if(timeRemaining <= 0 && !this.state.finished) {
                this.setState({ finished: true })
                if(typeof(this.props.notification) != 'undefined') {
                    let notification = new Notification(
                        this.props.notification.title, {
                            body: this.props.notification.body
                        });
                }
                clearInterval(this.interval);
            }
            message = this.getTimeMessage(timeRemaining);
            this.setState({ message: message });
        }
        this.forceUpdate()
    }

    render() {
        const { completionDate } = this.props;
        const { message } = this.state;

        return (
            <span>{message}</span>
        );
    }
}

function mapStateToProps(state) {
    const { completionDate } = state;
    return { completionDate };
}

Timer = connect(mapStateToProps)(Timer);
