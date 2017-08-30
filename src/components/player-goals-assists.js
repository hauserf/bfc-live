import React from 'react';

const PlayerGoalsAssists = (props) => {

    return (
      <div className="goals-assists" >
          <div className="goals">
           {props.goals
             .map((goal, id) => {
             return <img className="roster-icon-mini" key={id} src="soccer-ball.png" alt="icon8 - goal" />}
           )}{props.assists
             .map((assist, id) => {
             return <img className="roster-icon-mini" key={id} src="gift.png" alt="icon8 - goal" /> }
           )}
          </div>
      </div>
    );
}

export default PlayerGoalsAssists;
