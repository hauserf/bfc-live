import React from 'react';

const HighlightsContainerIntro = (props) => {
  return (
    <div>
      { props.currentButtonState === 0
          ?
          <div>
            <div className="bfc-logo-wrapper">
              <img className="bfc-logo" src="BFCNY_logo_fullcolor.png" alt="BFC logo" />
            </div>
            <div className="checklist-wrapper">
              <h4>Beyond F.C. New York</h4>
            </div>
          </div>
        : null
      }
    </div>
  );
}

export default HighlightsContainerIntro;
