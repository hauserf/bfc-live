import React from 'react';

const PlayerAssists = (props) => {

  const handlePlayerAssists = props.handlePlayerAssists.bind(null, props.id);

  return (
    <div
      className="player-stats record-assists"
      onClick={handlePlayerAssists}>
    </div>
  );
}

export default PlayerAssists;
