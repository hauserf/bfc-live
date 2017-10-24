import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Player from './player';
import Fixture from './fixture';
import Timer from './timer';
import Footer from './footer';
import { Alert } from 'react-bootstrap';
import { AppLang } from '../data/applang';

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

  fastForward(mins){
    this.props.fastForward(mins);
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

  toggleTweetUpdates = (e) => {
    this.props.toggleTweetUpdates();
  }

  matchTeamID = (element) => {
    return element === this.props.teamCode
  }

  render() {

    const numberOfPlayersPlaying = this.props.roster.filter((player, id) => player.playerActive).length;
    // const numberOfSubs = this.props.roster.filter((player, id) => !player.playerActive).length;

    const applang = this.props.applang;
    const copy = AppLang.views.roster;

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
          applang={this.props.applang}
        />
        <div>
          <h3 className="roster-title">
            {this.props.currentButtonState < 1
              ? copy.titles.startingPlayers[applang]
              : copy.titles.currentlyPlaying[applang]
              // ? "Starting Players "
              // : "Playing "
            }
              ({numberOfPlayersPlaying})
          </h3>

            {this.props.roster.filter((player, id) => player.playerActive).length === 0
            ? <p className="roster-hint">{copy.hints.selectPlayers[applang]}</p>
            : null
            }
            {/* ? <p className="roster-hint">Select players from "Available Roster" to track playing time and record goals and assists.</p>
            : null
            } */}




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

            <h3 className="roster-title">

              {this.props.roster.filter((player, id) => player.playerActive).length === 0
              ? copy.titles.availableRoster[applang]
              : copy.titles.subs[applang]
              }
              {/* ? "Available Roster "
              : "Subs "} */}
              {/* ({numberOfSubs}) */}

            </h3>
            <ReactCSSTransitionGroup
              transitionName="slide"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={1}>

            {this.props.roster
                // .filter((player, id) => player.teamID === this.props.teamCode)
                .filter((player, id) => this.props.teamCode === (player.teamID).find(this.matchTeamID))
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
        <div className="pt-4">
        {this.props.tweetUpdates === false
          ? (<Alert bsStyle="warning">
              {copy.twitterActivation.activate.alert[applang]}
              {/* <strong>Automatic twitter updates</strong> are turned off by default. Click 'ACTIVATE' to activate updates using the club's official Twitter account @BFCNY. */}
              <div className="text-right">
                <button className="btn btn-info mt-3" onClick={this.toggleTweetUpdates}> {copy.twitterActivation.activate.btn[applang]} </button>
              </div>
            </Alert>)
          : (<Alert bsStyle="warning">
              {copy.twitterActivation.deactivate.alert[applang]}
              {/* <strong>Automatic twitter updates</strong> are currently turned on. Click 'DEACTIVATE' to deactivate twitter updates. */}
              <div className="text-right">
                <button className="btn btn-danger mt-3" onClick={this.toggleTweetUpdates}> {copy.twitterActivation.deactivate.btn[applang]} </button>
              </div>
            </Alert>)
        }
      </div>
        <Footer
          applang={this.props.applang}
        />
      </div>
    )
  }
}

export default Roster;
