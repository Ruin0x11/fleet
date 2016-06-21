import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notifier from '../components/Notifier'

function mapStateToProps (state) {
    if(!state.messageData.message) {
        return {
            message: ""
        }
    }
    return {
        message: state.messageData.message,
        color: state.messageData.color
    };
}

const NotifierContainer = React.createClass({
    render() {
        return <Notifier {...this.props} />;
    }
});

export default connect(mapStateToProps)(NotifierContainer);
