import React from 'react';

const PlayerGoals = (props) => {

  const handlePlayerGoals = props.handlePlayerGoals.bind(null, props.id);
  
  return (
    <div
      className="player-stats record-goals"
      onClick={handlePlayerGoals}>
    </div>
  );
}

export default PlayerGoals;
