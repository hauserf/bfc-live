import React from 'react';

const PlayerRed = (props) => {

  const handleRed = props.handleRed.bind(null, props.id);
  const timeOfRedCard = (Math.ceil(props.redCard[0] / 60) + "'");

  return (
    <div className="card-wrapper">
      { props.secondYellow === true && props.firstYellow === true
        ? null
        : props.redCard.length === 1
          ? <div className="player-stats red-card-active" onClick={handleRed}>
              {timeOfRedCard}
            </div>
          : <div className="player-stats red-card" onClick={handleRed}>

            </div>
      }
    </div>
  );
}

export default PlayerRed;
