import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PlayerX from './player-x';
import Fixture from './fixture';
import Timer from './timer';

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

  addGoalBFC = (e) => {
    this.props.addGoalBFC();
  }

  addGoalOPP = (e) => {
    this.props.addGoalOPP();
  }

  startStopMatch(e){
    this.props.startStopMatch();
  }

  fastForward(e){
    this.props.fastForward();
  }

  snapGoalsBFC(e){
    this.props.snapGoalsBFC();
  }

  snapGoalsOPP(e){
    this.props.snapGoalsOPP();
  }

  handleSentimentSelected = (sentiment) => {
    this.props.handleSentimentSelected(sentiment);
  }

  render() {

    const numberOfPlayersPlaying = this.props.roster.filter((player, id) => player.playerActive).length;
    const numberOfSubs = this.props.roster.filter((player, id) => !player.playerActive).length;

    return (
      <div>
        <Fixture
          teamBFC={this.props.teamBFC}
          beyondScore={this.props.beyondScore}
          addGoalBFC={this.addGoalBFC}
          teamOPP={this.props.teamOPP}
          oppScore={this.props.oppScore}
          addGoalOPP={this.addGoalOPP}
        />
        <Timer
          currentState={this.props.currentState}
          currentTime={this.props.timeLive}
          onOff={this.startStopMatch.bind(this)}
          currentButtonState={this.props.currentButtonState}
          fastForward={this.fastForward.bind(this)}
          handleSentimentSelected={this.handleSentimentSelected.bind(this)}
          sentiment={this.props.sentiment}
          oppScore={this.props.oppScore}
          beyondScore={this.props.beyondScore}
        />
        <div>
          <h3 className="roster-title">
            {this.props.currentButtonState < 1
              ? "Starting Players "
              : "Playing "
            }
              ({numberOfPlayersPlaying})
          </h3>

            {this.props.roster.filter((player, id) => player.playerActive).length === 0
            ? <p className="roster-hint">Select players from "Available Roster"</p>
            : null
            }




            <ReactCSSTransitionGroup
              transitionName="slide"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={1}>

            {this.props.roster
                .filter((player, id) => player.playerActive)
                .map((player, id) =>
                    <PlayerX
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

            <h3 className="roster-title">

              {this.props.roster.filter((player, id) => player.playerActive).length === 0
              ? "Available Roster "
              : "Subs "}
              {/* ({numberOfSubs}) */}

            </h3>
            <ReactCSSTransitionGroup
              transitionName="slide"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={1}>

            {this.props.roster
                .filter((player, id) => player.teamID === this.props.teamCode)
                .filter((player, id) => !player.playerActive)
                .map((player, id) =>
                    <PlayerX
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
