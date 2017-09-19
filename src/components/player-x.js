import React,  { Component } from 'react';
// import PropTypes from 'prop-types';
// import PlayerName from './player-name';
import PlayerName from './player-name';
import StatsCounter from './stats-counter';
import PlayerMore from './player-more';
import PlayerSubIn from './player-subin';
import PlayerSubOut from './player-subout';
import PlayerAssists from './player-assists';
import PlayerGoals from './player-goals';
import PlayerFirstYellow from './player-first-yellow';
import PlayerSecondYellow from './player-second-yellow';
import PlayerRed from './player-red';
import PlayerMinsTotal from './player-mins-total';
import PlayerMinsInterval from './player-mins-interval';
import PlayerGoalsAssists from './player-goals-assists';


export default class Player extends Component {

  handleToggle = (id) => {
      this.props.handlePlayerToggle(id);
  }

  handleFirstYellow = (id) => {
      this.props.handleFirstYellow(id);
  }

  handleSecondYellow = (id) => {
      this.props.handleSecondYellow(id);
  }

  handleRed = (id) => {
      this.props.handleRed(id);
  }

  handlePlayerGoals = (id) => {
      this.props.handlePlayerGoals(id);
  }

  handlePlayerAssists = (id) => {
      this.props.handlePlayerAssists(id);
  }

  handlePlayerOwnGoals = (id) => {
      this.props.handlePlayerOwnGoals(id);
  }


  render() {
    return (
        <div className="player-x">
          { this.props.playerActive === true
            ? <PlayerSubOut {...this.props}/>
            : <PlayerSubIn {...this.props}/>
          }


          <PlayerName
            handleToggle={this.handleToggle}
            {...this.props}
          />

          <PlayerMinsInterval
            {...this.props}
          />

          <PlayerMinsTotal
            {...this.props}
          />
          <PlayerMore
            {...this.props}
          />

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
