import React, { PropTypes, Component } from 'react';
require('rc-progress/assets/index.css');
var Line = require('rc-progress').Line;
import styles from './HealthBar.css';

export default class HealthBar extends Component {
    static propTypes = {
        percent: PropTypes.number.isRequired,
        width: PropTypes.number,
        color: PropTypes.string
    };

    static defaultProps = {
        percent: 0,
        width: 6,
        color: "#3FC7FA"
    };

    state = {
        percent: this.props.percent
    };

    componentDidMount() {
        this.changeState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.changeState(nextProps)
    }

    percentToRGB(percent) {
        if (percent === 100) {
            percent = 99
        }
        percent = 100 - percent
        var r, g, b;

        if (percent < 50) {
            // green to yellow
            r = Math.floor(255 * (percent / 50));
            g = 255;

        } else {
            // yellow to red
            r = 255;
            g = Math.floor(255 * ((50 - percent % 50) / 50));
        }
        b = 0;

        return "rgb(" + r + "," + g + "," + b + ")";
    }

    changeState(nextProps) {
        this.setState({
            percent: nextProps.percent,
            color: this.percentToRGB(nextProps.percent)
        });
    }

    render() {
        let {percent, color} = this.state;
        return (
                <div className={styles.container}>

                <div className={styles.segmentcontainer}>
                <span className={styles.segment}/>
                <span className={styles.segment}/>
                <span className={styles.segment}/>
                <span className={styles.segment}/>
                </div>
                <Line percent={percent} strokeWidth={this.props.width} strokeColor={color}/>
                </div>
        );
    }
}

