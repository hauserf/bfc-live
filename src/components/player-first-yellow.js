import React from 'react';

const PlayerFirstYellow = (props) => {

  const handleFirstYellow = props.handleFirstYellow.bind(null, props.id);
  const timeOfFirstYellows = (Math.ceil(props.yellowCards[0] / 60) + "'");

  return (
    <div className="card-wrapper">
      { props.firstYellow === false && props.redCard.length === 1
        ? null
        : props.firstYellow === true
          ? <div className="player-stats first-yellow-active player-col-darker" onClick={handleFirstYellow}>
              {timeOfFirstYellows}
            </div>
          : <div className="player-stats first-yellow" onClick={handleFirstYellow}>
            </div>
      }
    </div>
  );
}

export default PlayerFirstYellow;
