import React from 'react';
import { Link } from 'react-router-dom';

const PlayerMore = (props) => {

  const playerID = props.id;
  const playerURL = `/players/${playerID}`;
  console.log(playerID);

  return (
    <div className="stats-more">
      <Link to={playerURL}><img className="" src="dots..png" alt="|||" /></Link>
    </div>
  );
}

export default PlayerMore;
