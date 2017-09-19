import React from 'react';
import { Link } from 'react-router-dom';

const Button = (props) => {

  return (
    <div className="flex-con flex-dir-col">
        <Link to={props.link}><button className={props.css}>{props.text}</button></Link>
    </div>

  );
}

export default Button;
