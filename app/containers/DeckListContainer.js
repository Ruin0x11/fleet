import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import DeckList from '../components/DeckList';
import { getDeckList } from '../selectors/port';

function mapStateToProps (state) {
    if(!state.portData.api_deck_port) {
        return {
            decks: [],
            currentDeck: -1
        };
    }
    return {
        decks: getDeckList(state),
        currentDeck: 0
    };
}

const DeckListContainer = React.createClass({
    render() {
        return <DeckList {...this.props} />;
    }
});

export default connect(mapStateToProps)(DeckListContainer);

