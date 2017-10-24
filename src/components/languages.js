import React from 'react';
import LanguageSelector from './language-selector';

const Languages = (props) => {

  const handleLanguageSelected = props.handleLanguageSelected.bind(this);

  return (
    <div className="flex-con flex-dir-row">
        <div className="flex-con applang">
            <LanguageSelector
              name="englishUS"
              source="united-states.png"
              alt="English US"
              cssClass="langsel"
              handleLanguageSelected={handleLanguageSelected}/>
            <LanguageSelector
              name="german"
              source="germany.png"
              alt="German"
              cssClass="langsel"
              handleLanguageSelected={handleLanguageSelected}/>
            <LanguageSelector
              name="french"
              source="france.png"
              alt="French"
              cssClass="langsel"
              handleLanguageSelected={handleLanguageSelected}/>
        </div>
    </div>
  );
}

export default Languages;
