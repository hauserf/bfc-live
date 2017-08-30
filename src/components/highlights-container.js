import React from 'react';
import HighlightsContainerIntro from './highlights-container-intro';

const HighlightsContainer = (props) => {
  return (
    <div className="highlights-container">
      <div className="highlights-intro">
      </div>
      <div className="highlights">
        <ul className="list-unstyled">
          {props.lister}
        </ul>
      </div>
      <HighlightsContainerIntro
        currentButtonState={props.currentButtonState}
      />
    </div>
  );
}

export default HighlightsContainer;
