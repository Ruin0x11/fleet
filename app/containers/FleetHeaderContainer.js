import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FleetHeader from '../components/FleetHeader';
import { getPlayerData } from '../selectors/port';

function mapStateToProps (state) {
    if(!state.portData.api_basic) {
        return {};
    }
    return getPlayerData(state);
}

const FleetHeaderContainer = React.createClass({
    render() {
        return <FleetHeader {...this.props} />;
    }
});

export default connect(mapStateToProps)(FleetHeaderContainer);
