import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notifier from '../components/Notifier'
import { getShipInfo } from '../selectors/port'

function mapStateToProps (state) {
    if(!state.messageData.message) {
        return {
            isActive: false
        }
    }

    var color = state.messageData.color;

    if(state.messageData.shipId && state.shipInfo) {
        var shipInfo = state.shipInfo;
        color = getRarityColor(shipInfo[state.messageData.shipId].rarity);
    }

    return {
        message: state.messageData.message,
        isActive: state.messageData.isActive,
        color: color
    };
}

function getRarityColor(rarity) {
    var color;
    switch(rarity) {
        case 1:
            color = "#4F79D8"
            break;
        case 2:
            color = "#92C0E2"
            break;
        case 3:
            color = "#77C8CE"
            break;
        case 4:
            color = "#757B87"
            break;
        case 5:
            color = "#C8B33F"
            break;
        case 6:
        case 7:
        case 8:
            color = "#DEA9D1"
            break;
        default:
            color = "#000000"
            break;
    }
    return color;
}

const NotifierContainer = React.createClass({
    render() {
        return <Notifier {...this.props} />;
    }
});

export default connect(mapStateToProps)(NotifierContainer);
