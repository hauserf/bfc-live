import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Footer extends Component {

  clickMe(){
    console.log("hello");
  }



  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-sm-4 footer">
              <NavLink to="/roster" activeStyle={{ background: 'orange', 'textDecoration': 'none' }} className="footer-col">Roster</NavLink>
              <NavLink to="/bfc-live" activeStyle={{ background: 'orange', 'textDecoration': 'none' }} className="footer-col">Live Stats</NavLink>
          </div>
        </div>
      </div>
    )
  }
}
