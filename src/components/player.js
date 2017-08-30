import React,  { Component } from 'react';
// import PropTypes from 'prop-types';
import PlayerName from './player-name';
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
        <div className=
          {this.props.redCard.length === 1 || this.props.secondYellow === true
            ? "player red-carded"
            : "player"
          }>
          <PlayerName
            handleToggle={this.handleToggle}
            {...this.props}
          />

          <PlayerGoalsAssists
            {...this.props}
          />
          { this.props.playerActive === true && this.props.clockState === true
            ? <PlayerGoals {...this.props} />
            : null
          }
          { this.props.playerActive === true && this.props.clockState === true
            ? <PlayerAssists {...this.props} />
            : null
          }

          <PlayerFirstYellow
            {...this.props}
          />
          <PlayerSecondYellow
            {...this.props}
          />
          <PlayerRed
            {...this.props}
          />
          <PlayerMinsInterval
            {...this.props}
          />

          <PlayerMinsTotal
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
