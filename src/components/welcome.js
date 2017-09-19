import React from 'react';
import Button from './commons/button';

const Welcome = (props) => {

  return (
    <div className="flex-con flex-dir-col">
        <div className="bfc-logo-wrapper flex-con flex-dir-col">
          <img className="bfc-logo" src="BFCNY_logo_fullcolor.png" alt="BFC logo" />
        </div>
        <h2 className="title-welcome text-center">Beyond F.C. <span className="font-italic font-weight-normal text-secondary"> live </span></h2>
        <p className="intro-welcome"> Access as</p>
        <div className="text-center">
          <Button link="/start" css="input-btn" text="Manager"/>
          <Button link="/fanview" css="input-btn bg-secondary" text="Player"/>
        </div>
        <div className="bfc-logo-wrapper flex-con flex-dir-col">
          <p className="pitch-welcome"> One click live stats, updates and game reports for clubs and leagues. Powered by </p>
          <img className="bfc-logo" src="hellofc_logo.png" alt="BFC logo" />
        </div>
    </div>

  );
}

export default Welcome;
