import React, { Component } from 'react';
import Home from '../components/Home';
import ShipList from '../components/ShipList';


export default class ShipListContainer extends Component {
  constructor() {
    super();
    this.state = { ships: [] }
  }

  componentDidMount() {
      this.setState({ships: [{name: "赤城", health: 50}]});
    // $.ajax({
    //   url: "/my-comments.json",
    //   dataType: 'json',
    //   success: function(comments) {
    //     this.setState({comments: comments});
    //   }.bind(this)
    // });
  }

  render() {
    return <ShipList ships={this.state.ships} />;
  }
}
