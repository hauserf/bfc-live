import React from 'react';

const PlayerName = (props) => {

    const handleToggle = props.handleToggle.bind(null, props.id);

    return (
      <div className="player-names" onClick={handleToggle}>
          {props.firstName}
      </div>
    );
}

export default PlayerName;

//
// <div className="player-names" onClick={handleToggle}>
//     {props.firstName}
// </div>
