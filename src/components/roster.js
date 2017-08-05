import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Player } from './player';

class Roster extends Component {

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

    const numberOfPlayersPlaying = this.props.roster.filter((player, id) => player.playerActive).length;
    const numberOfSubs = this.props.roster.filter((player, id) => !player.playerActive).length;

    return (
      // <div className="container">
      //     <div className="row">
      //         <div className="col-md-4 "></div>
      //         <div className="col-sm-4 bfc-live">
                <div>
                  <div>
                    { this.props.clockState === false
                      ? <Link to="/bfc-live"><div className="copy-report">Start/resume game to add scores and track time >>> </div> </Link>
                      : null
                    }
                    <div className="flex-con flex-items-align mr-2">
                      <h3 className="setting-h mx-2">
                        {this.props.currentButtonState < 1
                          ? "Starting Players"
                          : "Playing"}
                          {`(${numberOfPlayersPlaying})`}
                        </h3>

                      {this.props.clockState === true
                      ? <Link to="/bfc-live"><button className="back-to-live flex-align-self-center">Go to BFC Live >>> </button></Link>
                      : null }
                    </div>
                      <p className="roster-hint">
                        {this.props.roster.filter((player, id) => player.playerActive).length === 0
                        ? "Select players from the 'Available Roster' by tapping the player's name."
                        : null}
                      </p>

                      <ReactCSSTransitionGroup
                        transitionName="slide"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={1}>

                      {this.props.roster
                          .filter((player, id) => player.playerActive)
                          .map((player, id) =>
                              <Player
                                  key={player.id}
                                  handleToggle={this.handleToggle}
                                  handleFirstYellow={this.handleFirstYellow}
                                  handleSecondYellow={this.handleSecondYellow}
                                  handleRed={this.handleRed}
                                  handlePlayerGoals={this.handlePlayerGoals}
                                  handlePlayerAssists={this.handlePlayerAssists}
                                  handlePlayerOwnGoals={this.handlePlayerOwnGoals}
                                  timeLive={this.props.timeLive}
                                  clockState={this.props.clockState}

                                  {...player}
                              />
                          )}

                      </ReactCSSTransitionGroup>

                      <h3 className="setting-h">

                        {this.props.roster.filter((player, id) => player.playerActive).length === 0
                        ? "Available Roster"
                        : "Subs"}
                        ({numberOfSubs})

                      </h3>
                      <ReactCSSTransitionGroup
                        transitionName="slide"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={1}>

                      {this.props.roster
                          .filter((player, id) => !player.playerActive)
                          .map((player, id) =>
                              <Player
                                  key={player.id}
                                  handleToggle={this.handleToggle}
                                  handleFirstYellow={this.handleFirstYellow}
                                  handleSecondYellow={this.handleSecondYellow}
                                  handleRed={this.handleRed}
                                  handlePlayerGoals={this.handlePlayerGoals}
                                  handlePlayerAssists={this.handlePlayerAssists}
                                  handlePlayerOwnGoals={this.handlePlayerOwnGoals}
                                  timeLive={this.props.timeLive}
                                  {...player}
                              />
                          )}
                      </ReactCSSTransitionGroup>
                  </div>
              </div>
    )
  }
}

export default Roster;
