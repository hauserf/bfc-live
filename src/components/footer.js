import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Footer extends Component {

  clickMe(){
    console.log("hello");
  }



  render() {
    return(
      <div className="navbar-footer footer">
        <NavLink to="/roster" activeStyle={{ background: 'orange', 'textDecoration': 'none', color: '#fff'}} className="footer-col footer-roster">Manager View</NavLink>
        <NavLink to="/bfc-live" activeStyle={{ background: 'orange', 'textDecoration': 'none', color: '#fff' }} className="footer-col footer-roster">Fan View</NavLink>
      </div>
    )
  }
}
