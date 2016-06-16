import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import ShipList from '../components/ShipList';
import { getDeckList } from '../selectors/port';

function mapStateToProps (state) {
    if(!state.portData.api_deck_port) {
        return {
            currentDeck: -1
        };
    }
    return {
        decks: getDeckList(state),
        currentDeck: 0
    };
}

const ShipListContainer = React.createClass({
    render() {
        return <ShipList {...this.props} />;
    }
});

export default connect(mapStateToProps)(ShipListContainer);

