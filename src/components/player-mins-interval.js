import React from 'react';

const PlayerMinsInterval = (props) => {

  // minutesPlayed current interval

  const playerSubIns = props.subIns;
  const playerSubOuts = props.subOuts;

  const playerMinutes = (subCeil) => {
    let minutesPlayed = 0;
      for (let i = 0; i < subCeil ; i += 1) {
        minutesPlayed += playerSubOuts[i] - playerSubIns[i]
      }
    return minutesPlayed
  };

  const latestSubIn = props.subIns[props.subIns.length - 1];
  const currentInterval = props.timeLive - latestSubIn;
  const playerMinutesRunning = playerMinutes(playerSubOuts.length) + currentInterval;

  const updateMinutes = () => {
    if (playerSubIns.length === 0) {
      return 0
    } else if (playerSubIns.length === 1 && playerSubOuts === 0) {
        return currentInterval
      } else if (playerSubIns.length > playerSubOuts.length){
          return playerMinutesRunning
        } else {
            return playerMinutes(playerSubIns.length)
          }
  };

  const minutesPlayedCurrentInterval = props.timeLive - latestSubIn

  return (
    <div>
      { minutesPlayedCurrentInterval === updateMinutes()
        ? null
        : props.playerActive === true
          ? <div className="player-minutes player-col-darker ">{("0" + Math.floor(minutesPlayedCurrentInterval / 60)).slice(-2) + ":" + ("0" + minutesPlayedCurrentInterval % 60).slice(-2)}</div>
          : null
      }
    </div>
  );
}

export default PlayerMinsInterval;
