import React from 'react';

const LengthOfHalfSelector = (props) => {

  const handleLengthOfHalfSelected = props.handleLengthOfHalfSelected.bind(null, props.name);

  return (
    <div className="length-btn" onClick={handleLengthOfHalfSelected}>{props.name}</div>
  )
}

export default LengthOfHalfSelector;
