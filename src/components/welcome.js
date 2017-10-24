import React from 'react';
import Languages from './languages';
import Button from './commons/button';
import { AppLang } from '../data/applang';

const Welcome = (props) => {

  const applang = props.applang;
  const copy = AppLang.views.welcome;

  const handleLanguageSelected = (language) => {
    props.handleLanguageSelected(language);
  }

  return (
    <div className="flex-con flex-dir-col">
        <div className="bfc-logo-wrapper flex-con flex-dir-col">
          <img className="bfc-logo" src="BFCNY_logo_fullcolor.png" alt="BFC logo" />
        </div>
        <h2 className="title-welcome text-center">Beyond F.C. <span className="font-italic font-weight-normal text-secondary"> live </span></h2>
        {/* <p className="intro-welcome text-center"> Access as</p> */}
        <p className="intro-welcome text-center"> {copy.accessText[applang]} </p>
        <div className="text-center">
          <Button link="/start" css="input-btn" text={copy.accessBtn.manager[applang]}/>
          <Button link="/fanview" css="input-btn bg-secondary" text={copy.accessBtn.player[applang]}/>
        </div>
        <div className="bfc-logo-wrapper flex-con flex-dir-col">
          {/* <p className="pitch-welcome"> One click live stats, social updates and game reports for clubs and leagues. Powered by </p> */}
          <p className="pitch-welcome">{copy.pitch[applang]}</p>
          <img className="bfc-logo" src="hellofc_logo.png" alt="BFC logo" />
        </div>
        <Languages
          handleLanguageSelected={handleLanguageSelected}
        />
    </div>

  );
}

export default Welcome;
