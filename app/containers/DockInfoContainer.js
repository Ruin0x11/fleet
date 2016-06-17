import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DockInfo from '../components/DockInfo';
import { getDockInfo } from '../selectors/port';

function mapStateToProps (state) {
    if(!state.portData.api_ndock) {
        return {};
    }
    return {};
}

const DockInfoContainer = React.createClass({
    render() {
        return <DockInfo {...this.props} />;
    }
});

export default connect(mapStateToProps)(DockInfoContainer);
