import React, { Component } from 'react';
// import FixtureBFC from './components/fixture-bfc';
// import FixtureOPP from './components/fixture-opp';
import Timer from './components/timer';

export default class BFCLive extends Component {

  addGoalBFC(e){
    this.props.addGoalBFC();
  }

  addGoalOPP(e){
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

    return (
          <div>
            {/* <div className="fixture">
              <div className="fixture-teams">
              <FixtureBFC
                teamBFC={this.props.teamBFC}
                currentBFCScore={this.props.beyondScore}
                scoreChange={this.addGoalBFC.bind(this)}
              />
              </div>
              <div className="vs-fixture"> : </div>
              <div className="fixture-teams">
              <FixtureOPP
                teamOPP={this.props.teamOPP}
                currentOPPScore={this.props.oppScore}
                scoreChange={this.addGoalOPP.bind(this)}
              />
              </div>
            </div> */}
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
            <div className="highlights-container">
              <div className="highlights-intro">
              </div>
              <div className="highlights">
                <ul className="list-unstyled">
                  {this.props.lister}
                </ul>
              </div>
              <div>
                { this.props.currentButtonState === 0
                    ?
                    <div>
                      <div className="bfc-logo-wrapper">
                        <img className="bfc-logo" src="BFCNY_logo_fullcolor.png" alt="BFC logo" />
                      </div>
                      <div className="checklist-wrapper">
                        Before the game starts, please make sure to
                        <div className="checklist">
                          <ol>
                            <li>Update game details in 'Settings'</li>
                            <li>Select starting players in 'Roster'</li>
                            <li>Take a team photo</li>
                            <li>Return to 'Live' to start the timer</li>
                          </ol>
                        </div>
                        <h3>#GoBeyond</h3>
                      </div>
                    </div>
                  : null
                }
              </div>
            </div>
          </div>
    );
  }
}
