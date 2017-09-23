import React from 'react';

const ExtraMinsButton = (props) => {

  // const fastForward = props.fastForward.bind(this);
  const fastForward = props.fastForward.bind(null, props.value * 60);

  return (
    <button
      className="fwd-bwd"
      id="buttonPlusEight"
      onClick={fastForward}>
      {props.name}
    </button>
  );
}

export default ExtraMinsButton;
