import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import ShipList from '../components/ShipList';
import { getDeckList } from '../selectors/port';

function mapStateToProps (state) {
    return {
        decks: getDeckList(state),
        currentDeck: 0
    };
}

const ShipListContainer = React.createClass({
    render() {
        console.log(this.props)
        return <ShipList currentDeck={1} {...this.props} />;
    }
});

export default connect(mapStateToProps)(ShipListContainer);

