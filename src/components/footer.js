import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AppLang } from '../data/applang';

export default class Footer extends Component {

  clickMe(){
    console.log("hello");
  }



  render() {

    const applang = this.props.applang;
    const copy = AppLang.views.footer;

    return(
      <div className="navbar-footer footer">
        <NavLink to="/roster" activeStyle={{ background: 'orange', 'textDecoration': 'none', color: '#fff'}} className="footer-col footer-roster">{copy.manager[applang]}</NavLink>
        <NavLink to="/bfc-live" activeStyle={{ background: 'orange', 'textDecoration': 'none', color: '#fff' }} className="footer-col footer-roster">{copy.fan[applang]}</NavLink>
      </div>
    )
  }
}
