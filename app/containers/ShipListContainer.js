import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import ShipList from '../components/ShipList';


function mapStateToProps (state) {
    return {
        ships: state.port_data
    };
}

render() {
    return <ShipList ships={this.state.ships} />;
}
}
