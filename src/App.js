import React, { Component } from 'react';
import FixtureBFC from './components/fixture-bfc';
import FixtureOPP from './components/fixture-opp';
import Timer from './components/timer';
import GoalsBFC from './components/highlights_goalsBFC';
import GoalsOPP from './components/highlights_goalsOPP';
import TimerState from './components/highlights_timer-state'

var timer;

export default class App extends Component {

  constructor(){
    super();
    this.state = {
      timeLive : 0,
      clockState: false,
      lengthOfHalf: 2700,
      lengthOfGame: 5400,
      teamBFC: "Beyond FC First",
      teamOPP: "NY Red Bull",
      beyondScore: 0,
      oppScore: 0,
      // timerEventCounter: 0,
      currentButtonState: 0,
      lister:[]
    }
  }

  componentDidMount() {
    var arrayKickoff = this.state.lister;
    arrayKickoff.unshift(
      [<TimerState time={this.state.timeLive} currentButtonState={-1}/>]
    );
    this.setState({lister:arrayKickoff})
    // console.log("click",this.state.lister);
  }

  addGoalBFC(e){
    var score = this.state.beyondScore;
    if(this.state.timeLive === 0){
      alert("Start the match first!");
    } else {
        this.setState({beyondScore:score+1})
        this.snapGoalsBFC();
      }
  }

  addGoalOPP(e){
    var score = this.state.oppScore;
    if(this.state.timeLive === 0){
      alert("Start the match first!");
    } else {
        this.setState({oppScore:score+1})
        this.snapGoalsOPP();
      }
  }

  startStopMatch(e){
    var buttonStateCounter = this.state.currentButtonState;
    if (this.state.clockState === false){
      this.setState({clockState: true, currentButtonState: buttonStateCounter + 1});
      timer = setInterval(()=>{this.setState({timeLive: this.state.timeLive+1})},1000);
    } else if(this.state.clockState === true && this.state.currentButtonState === 1){
        this.setState({clockState:false, currentButtonState: buttonStateCounter + 1, timeLive: this.state.lengthOfHalf})
        clearInterval(timer);
      } else if(this.state.clockState){
        this.setState({clockState:false, currentButtonState: buttonStateCounter + 1})
        clearInterval(timer);
        }

    const snapTimerState = (e) => {
      var arrayTimerState = this.state.lister;
      arrayTimerState.unshift(
        [<TimerState
          time={this.state.timeLive}
          currentButtonState={this.state.currentButtonState}/>]
      );
      this.setState({lister:arrayTimerState})
      // console.log("click",this.state.lister);
    }
    snapTimerState();
  }

  fastForward(e){
    var currentTime = this.state.timeLive
    this.setState({timeLive: currentTime + 480})
  }

  snapGoalsBFC(e){
    var arrayGoalBFC = this.state.lister;
    arrayGoalBFC.unshift(
      [<GoalsBFC
        time={this.state.timeLive}
        score={this.state.totalScore}
        timeLive={this.state.timeLive}
        currentButtonState={this.state.currentButtonState}
        lengthOfHalf={this.state.lengthOfHalf}
        lengthOfGame={this.state.lengthOfGame}
      />]
    );
    this.setState({lister:arrayGoalBFC})
    // console.log("click",this.state.lister);
  }

  snapGoalsOPP(e){
    var arrayGoalOPP = this.state.lister;
    arrayGoalOPP.unshift(
      [<GoalsOPP
        time={this.state.timeLive}
        score={this.state.totalScore}
        timeLive={this.state.timeLive}
        currentButtonState={this.state.currentButtonState}
        lengthOfHalf={this.state.lengthOfHalf}
        lengthOfGame={this.state.lengthOfGame}
      />]
    );
    this.setState({lister:arrayGoalOPP})
    // console.log("click",this.state.lister);
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 "></div>
          <div className="col-sm-4 bfc-live">
            <div className="fixture">
              <div className="fixture-teams">
              <FixtureBFC
                teamBFC={this.state.teamBFC}
                currentBFCScore={this.state.beyondScore}
                scoreChange={this.addGoalBFC.bind(this)}
              />
              </div>
              <div className="vs-fixture"> : </div>
              <div className="fixture-teams">
              <FixtureOPP
                teamOPP={this.state.teamOPP}
                currentOPPScore={this.state.oppScore}
                scoreChange={this.addGoalOPP.bind(this)}
              />
            </div>
              {/* <button onClick={this.addgoal.bind(this)}>+</button> */}
            </div>
            <Timer
              currentState={this.state.currentState}
              currentTime={this.state.timeLive}
              onOff={this.startStopMatch.bind(this)}
              // snap={this.snapGoals.bind(this)}
              currentButtonState={this.state.currentButtonState}
              plusMinutes={this.fastForward.bind(this)}
            />
            <div className="highlights-container">
              <div className="highlights-intro">
                <h1>#WeAreBeyond</h1>
              </div>
              <div className="highlights">
                <ul className="list-unstyled">
                  {this.state.lister}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
