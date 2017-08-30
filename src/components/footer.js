import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Footer extends Component {

  clickMe(){
    console.log("hello");
  }



  render() {
    return(

            <div className="navbar-footer footer">
              <NavLink to="/settings" activeStyle={{ background: 'orange', 'textDecoration': 'none', color: '#fff'}} className="footer-col footer-roster">1. Settings</NavLink>
              <NavLink to="/roster" activeStyle={{ background: 'orange', 'textDecoration': 'none', color: '#fff' }} className="footer-col footer-roster">2. Roster</NavLink>
              <NavLink to="/bfc-live" activeStyle={{ background: 'orange', 'textDecoration': 'none', color: '#fff'}} className="footer-col footer-live">Go Live</NavLink>

            </div>

    )
  }
}
