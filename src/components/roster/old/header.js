import React, { Component } from 'react';

export default class Header extends Component {

  render() {
    return (
      <div className="Header-wrap">
      <h2>{this.props.currentscore}</h2>
      </div>
    );
  }
}
