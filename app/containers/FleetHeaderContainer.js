import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FleetHeader from '../components/FleetHeader';
import { getPlayerData } from '../selectors/port';

function mapStateToProps (state) {
    if(!state.portData.api_basic) {
        return {
            nickname: '',
            comment: '',
            level: 0,
            rank: 0,
            numChara: 0,
            maxChara: 0,
            maxEquip: 0,
        };
    }
    return getPlayerData(state);
}

const FleetHeaderContainer = React.createClass({
    render() {
        return <FleetHeader {...this.props} />;
    }
});

export default connect(mapStateToProps)(FleetHeaderContainer);
