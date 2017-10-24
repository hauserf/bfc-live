import React from 'react';

const LanguageSelector = (props) => {

  const handleLanguageSelected = props.handleLanguageSelected.bind(null, props.name);

  return (
    <div className="" onClick={handleLanguageSelected}><img className={props.cssClass} src={props.source} alt={props.alt} /></div>
  )
}

export default LanguageSelector;
