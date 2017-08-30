import React from 'react';

const PlayerSecondYellow = (props) => {

  const handleSecondYellow = props.handleSecondYellow.bind(null, props.id);
  const timeOfSecondYellows = (Math.ceil(props.yellowCards[1] / 60) + "'");

  return (
    <div className="card-wrapper">
      { props.firstYellow === false || props.redCard.length === 1
        ? null
        : props.firstYellow === true && props.secondYellow === true
          ? <div className="player-stats second-yellow-active player-col-darker" onClick={handleSecondYellow}>
              {timeOfSecondYellows}
            </div>
          : <div className="player-stats second-yellow" onClick={handleSecondYellow}>

            </div>
      }
    </div>
  );
}

export default PlayerSecondYellow;
