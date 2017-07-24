import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect
} from 'react-router-dom';

//app components
import BFCLive from './bfc-live';
import Footer from './components/footer';
import Roster from './components/roster';
import Settings from './components/settings';
import TimerState from './components/highlights_timer-state';
import GoalsBFC from './components/highlights_goalsBFC';
import GoalsOPP from './components/highlights_goalsOPP';
import { PlayerStats } from './data/player-stats';
import { findById, togglePlayer, updatePlayer } from './lib/rosterHelpers'

var timer;

class App extends Component {

  state = {
      roster: [],
      timeLive : 0,
      clockState: false,
      lengthOfHalf: 2700,
      lengthOfGame: 5400,
      teamBFC: "BFC Team",
      teamOPP: "Opponent",
      beyondScore: 0,
      oppScore: 0,
      currentButtonState: 0,
      lister:[],
      format: "11v11"
  }

  componentWillMount() {
    var arrayKickoff = this.state.lister;
    arrayKickoff.unshift(
      [<TimerState timeLive={this.state.timeLive} currentButtonState={-1}/>]
    );
    this.setState({ lister: arrayKickoff })
    this.setState({ roster: PlayerStats })
  }


/********************************
------------ SETTINGS -----------
********************************/


  setBFCTeam(e){
    this.setState({teamBFC: e.target.value});
  }

  setOPPTeam(e){
    this.setState({teamOPP: e.target.value});
  }

  handleFormationSelected = (formationName) => {

    this.setState({ format: formationName });
  }

  handleLengthOfHalfSelected(lengthAdjuster) {
    this.setState({ lengthOfHalf: this.state.lengthOfHalf + (lengthAdjuster * 60)})
  }

/********************************
------------- ROSTER ------------
********************************/

  handleToggle = (id) => {
    const player = findById(id, this.state.roster)
    const toggled = togglePlayer(player)
    const updatedRoster = updatePlayer(this.state.roster, toggled)

    this.setState({ roster: updatedRoster })

    const roster = this.state.roster;
    const playerActive = updatedRoster[roster.indexOf(player)].playerActive;
    const playerSubIns = updatedRoster[roster.indexOf(player)].subIns;
    const playerSubOuts = updatedRoster[roster.indexOf(player)].subOuts;

    // record sub ins / sub outs (push time stamp into array)
    playerActive === true
    ? updatePlayer(updatedRoster, playerSubIns.push(this.state.timeLive))
    : updatePlayer(updatedRoster, playerSubOuts.push(this.state.timeLive))

  }

  handleFirstYellow = (id) => {
    const player = findById(id, this.state.roster)
    const toggleYellow = (player) => ({ ...player, firstYellow: !player.firstYellow})
    const toggled = toggleYellow(player)
    const updatedRoster = updatePlayer(this.state.roster, toggled)
    this.setState({ roster: updatedRoster })

    const roster = this.state.roster;
    const firstYellow = updatedRoster[roster.indexOf(player)].firstYellow;
    const yellowCards = updatedRoster[roster.indexOf(player)].yellowCards;

    firstYellow === true
      ? updatePlayer(updatedRoster, yellowCards.push(this.state.timeLive))
      : updatePlayer(updatedRoster, yellowCards.pop())
  }

  handleSecondYellow = (id) => {
    const player = findById(id, this.state.roster)
    const toggleYellow = (player) => ({ ...player, secondYellow: !player.secondYellow})
    const toggled = toggleYellow(player)
    const updatedRoster = updatePlayer(this.state.roster, toggled)
    this.setState({ roster: updatedRoster })

    const roster = this.state.roster;
    const secondYellow = updatedRoster[roster.indexOf(player)].secondYellow;
    const yellowCards = updatedRoster[roster.indexOf(player)].yellowCards;

    secondYellow === true
    ? updatePlayer(updatedRoster, yellowCards.push(this.state.timeLive))
    : updatePlayer(updatedRoster, yellowCards.pop())
  }

  handleRed = (id) => {
    const player = findById(id, this.state.roster)
    const roster = this.state.roster;
    const redCard = roster[roster.indexOf(player)].redCard;

    redCard.length === 0
    ? updatePlayer(roster, redCard.push(this.state.timeLive))
    : updatePlayer(roster, redCard.pop())

    this.setState({ roster })
  }


  // handleRed = (id) => {
  //   const player = findById(id, this.state.roster)
  //   const toggleRed = (player) => ({ ...player, redCard: !player.redCard })
  //   const toggled = toggleRed(player)
  //   const updatedRoster = updatePlayer(this.state.roster, toggled)
  //
  //   this.setState({ roster: updatedRoster })
  //
  // }

  /********************************
  ------------- BFC Live ------------
  ********************************/

  addGoalBFC(e){
    var score = this.state.beyondScore;
    if(this.state.timeLive === 0){
      alert("Start the game first!");
    } else if (this.state.currentButtonState === 2){
        alert("Restart game first!");
      } else if (this.state.currentButtonState === 4){
          alert("Game ended!");
    } else {
        this.setState({ beyondScore: score + 1 })
        this.snapGoalsBFC();
      }
  }

  addGoalOPP(e){
    var score = this.state.oppScore;
    if(this.state.timeLive === 0){
      alert("Start the game first!");
    } else if (this.state.currentButtonState === 2){
        alert("Restart game first!");
      } else if (this.state.currentButtonState === 4){
          alert("Game ended!");
    } else {
        this.setState({ oppScore: score + 1 })
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
        this.setState({ clockState: false, currentButtonState: buttonStateCounter + 1 })
        clearInterval(timer);
        }

    const snapTimerState = (e) => {
      var arrayTimerState = this.state.lister;
      arrayTimerState.unshift(
        [<TimerState
          timeLive={this.state.timeLive}
          currentButtonState={this.state.currentButtonState}/>]
      );
      this.setState({ lister: arrayTimerState })
    }
    snapTimerState();
  }

  fastForward(e){
    var currentTime = this.state.timeLive;
    this.setState({ timeLive: currentTime + 480 })
  }

  snapGoalsBFC(e){
    var arrayGoalBFC = this.state.lister;
    arrayGoalBFC.unshift(
      [<GoalsBFC
        timeLive={this.state.timeLive}
        currentButtonState={this.state.currentButtonState}
        lengthOfHalf={this.state.lengthOfHalf}
        lengthOfGame={this.state.lengthOfGame}
      />]
    );
    this.setState({ lister: arrayGoalBFC })

  }

  snapGoalsOPP(e){
    var arrayGoalOPP = this.state.lister;
    arrayGoalOPP.unshift(
      [<GoalsOPP
        // score={this.state.totalScore}
        timeLive={this.state.timeLive}
        currentButtonState={this.state.currentButtonState}
        lengthOfHalf={this.state.lengthOfHalf}
        lengthOfGame={this.state.lengthOfGame}
      />]
    );
    this.setState({ lister: arrayGoalOPP })
  }


  render() {

    return(
      <BrowserRouter>
        <div>

          <Route exact path="/" render={() => <Redirect to="/settings" />} />
          <Route path="/settings" render={() => <Settings
            setBFCTeam={this.setBFCTeam.bind(this)}
            setOPPTeam={this.setOPPTeam.bind(this)}
            teamBFC={this.state.teamBFC}
            teamOPP={this.state.teamOPP}
            format={this.state.format}
            lengthOfHalf={this.state.lengthOfHalf}
            handleFormationSelected={this.handleFormationSelected.bind(this)}
            handleLengthOfHalfSelected={this.handleLengthOfHalfSelected.bind(this)}
            />}
          />
          <Route path="/bfc-live" render={() => <BFCLive
            lister={this.state.lister}
            timeLive={this.state.timeLive}
            clockState={this.state.clockState}
            teamBFC={this.state.teamBFC}
            teamOPP={this.state.teamOPP}
            beyondScore={this.state.beyondScore}
            oppScore={this.state.oppScore}
            currentButtonState={this.state.currentButtonState}
            lengthOfHalf={this.state.lengthOfHalf}
            lengthOfGame={this.state.lengthOfGame}
            addGoalBFC={this.addGoalBFC.bind(this)}
            addGoalOPP={this.addGoalOPP.bind(this)}
            startStopMatch={this.startStopMatch.bind(this)}
            fastForward={this.fastForward.bind(this)}
            snapGoalsBFC={this.snapGoalsBFC.bind(this)}
            snapGoalsOPP={this.snapGoalsOPP.bind(this)}
            />}
          />
          <Route path="/roster" render={() => <Roster
            roster={this.state.roster}
            handlePlayerToggle={this.handleToggle.bind(this)}
            handleFirstYellow={this.handleFirstYellow.bind(this)}
            handleSecondYellow={this.handleSecondYellow.bind(this)}
            handleRed={this.handleRed.bind(this)}
            clockState={this.state.clockState}
            format={this.props.format}
            currentButtonState={this.state.currentButtonState}
            timeLive={this.state.timeLive}
            /> }
          />
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
