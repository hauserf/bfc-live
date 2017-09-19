import React from 'react';

const PlayerSubOut = (props) => {

  const handleToggle = props.handleToggle.bind(null, props.id);

  return (
    <div
      className="player-subso"
      onClick={handleToggle}
      >
      <img className="subs" src="subOut.png" alt="subout" />
    </div>
  );
}

export default PlayerSubOut;
