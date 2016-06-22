import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notifier from '../components/Notifier'

function mapStateToProps (state) {
    if(!state.messageData.message) {
        return {
            isActive: false
        }
    }
    return {
        message: state.messageData.message,
        isActive: state.messageData.isActive,
        color: state.messageData.color
    };
}

const NotifierContainer = React.createClass({
    render() {
        return <Notifier {...this.props} />;
    }
});

export default connect(mapStateToProps)(NotifierContainer);
