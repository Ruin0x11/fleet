import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DockInfo from '../components/DockInfo';
import { getDockInfo, getDeckList } from '../selectors/port';

function mapStateToProps (state) {
    if(!state.portData) {
        return { docks: [], decks: [] };
    }
    return {
        docks: getDockInfo(state),
        decks: getDeckList(state)
    };
}

const DockInfoContainer = React.createClass({
    render() {
        return <DockInfo {...this.props} />;
    }
});

export default connect(mapStateToProps)(DockInfoContainer);
