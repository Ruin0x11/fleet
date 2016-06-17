import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Notifier from '../components/Notifier'

function mapStateToProps (state) {
    return {
        message: "Teitoku!"
    };
}

const NotifierContainer = React.createClass({
    render() {
        return <Notifier {...this.props} />;
    }
});

export default connect(mapStateToProps)(NotifierContainer);
