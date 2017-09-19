import React,  { Component } from 'react';
// import PropTypes from 'prop-types';
// import PlayerName from './player-name';
import PlayerGameStats from './player-game-stats';
import PlayerPerformanceStats from './player-performance-stats';
import { Link } from 'react-router-dom';



export default class PlayerDetailsPage extends Component {

  render() {
    const playerID = this.props.match.params.id;
    const player = this.props.roster.filter((player) => player.id === playerID);
    const playerName = player.map((player) => `${player.firstName} ${player.lastName}`);

    return (
        <div >
          <Link to="/roster"><div className="nav-banner-top"><img alt="< Back" /> </div></Link>
          <p className="text-warning pull-right mx-4">...coming soon</p>
          <h1 className="setting-h"> {playerName} </h1>
          <h4 className="roster-title"> Player Game Stats </h4>
          {player.map((player) =>
                <PlayerGameStats
                  key={player.id}
                  {...this.props}
                  {...player}
                />
              )}
          <h4 className="roster-title"> Health & Performance </h4>
          {player.map((player) =>
                <PlayerPerformanceStats
                  key={player.id}
                  {...this.props}
                  {...player}
                />
              )}
        </div>
    );
  };
}

// Player.propTypes = {
//     id: PropTypes.number.isRequired,
//     firstName: PropTypes.string.isRequired,
//     handleToggle: PropTypes.func.isRequired,
//     handleFirstYellow: PropTypes.func.isRequired,
//     handleSecondYellow: PropTypes.func.isRequired,
//     handleRed: PropTypes.func.isRequired
// }
//
// Player.defaultProps = {}
