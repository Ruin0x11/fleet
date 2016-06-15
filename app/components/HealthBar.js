import React, { Component } from 'react';
require('rc-progress/assets/index.css');
var Line = require('rc-progress').Line;

export default class HealthBar extends Component {
    static propTypes = {
        percent: React.PropTypes.number.isRequired,
        color: React.PropTypes.string
    };

    static defaultProps = {
        percent: 0,
        color: "#3FC7FA"
    };

    state = {
        percent: this.props.percent
    };

    componentDidMount() {
        this.handleProps(this.props)
    }

    handleProps = (props) => {
        this.setState({
            percent: props.percent
        });
    };

    changeState() {
        var colorMap = ["#3FC7FA", "#85D262", "#FE8C6A"]
        this.setState({
            percent: this.state.percent,
            color: colorMap[parseInt(Math.random()*3)]
        });
    }

    render() {
        var containerStyle = {
            "width": "250px",
            "display": "inline-block"
        }
        var circleContainerStyle = {
            "width": "250px",
            "height": "250px"
        }
        let {percent, color} = this.state;
        return (
                <div style={containerStyle}>
                <Line percent={percent} strokeWidth="4" strokeColor={color} />
                </div>
        );
    }
}
