import React from 'react';

const PlayerSubIn = (props) => {

  const handleToggle = props.handleToggle.bind(null, props.id);

  return (
    <div
      className="player-subs"
      onClick={handleToggle}
      >
      <img className="subs" src="subIn.png" alt="subin" />
    </div>
  );
}

export default PlayerSubIn;
