import React from 'react';

const ExtraMinsButton = (props) => {

  const fastForward = props.fastForward.bind(this);

  return (
    <button
      className="fwd-bwd"
      id="buttonPlusEight"
      onClick={fastForward}>
      +8
    </button>
  );
}

export default ExtraMinsButton;
