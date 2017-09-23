import React, { Component } from 'react';
import {
    BrowserRouter,
    Route,
    Redirect
} from 'react-router-dom';
import axios from 'axios';

//app components
import BFCLive from './components/bfc-live';
import Fanview from './components/fanview';
import Roster from './components/roster';
import PlayerDetailsPage from './components/player-details-page';
import Settings from './components/settings';
import Start from './components/start';
import Welcome from './components/welcome';
import TimerState from './components/highlights_timer-state';
import GoalsBFC from './components/highlights_BFC';
import GoalsOPP from './components/highlights_goalsOPP';
import GameReport from './components/game-report';

import { PlayerStats } from './data/player-stats';
import { Tweets } from './data/tweets';

import { findById, togglePlayer, updatePlayer } from './lib/rosterHelpers'

var timer;

class App extends Component {

    state = {
        teamCode: "",
        teamBFC: "Beyond FC",
        teamOPP: "Opponent",
        /*
            teamCodeMatched: false,
            scheduleID: "321",
            roster: [],
            timeLive : 0,
            clockState: false,
            lengthOfHalf: 2700,
            lengthOfGame: 5400,
            teamBFC: "Beyond FC",
            teamOPP: "Opponent",
            beyondScore: 0,
            oppScore: 0,
            currentButtonState: 0,
            lister:[],
            format: "11v11",
            sentiment: "inputNeeded",
            data: [],
            pollInterval: 2000,
            tweetUpdates: false,
        */
    }

    componentWillMount() {
        setTimeout(() => {
            axios.get('/api/state')
                .then(res => {
                    let newState = res.data;

                    const lister = newState.lister;
                    if (lister.length === 0) {
                        newState = { ...newState, lister: [<TimerState />] }
                    }
                    const roster = newState.roster;
                    if (roster.length === 0) {
                        newState = { ...newState, roster: PlayerStats }
                    }
                    console.log(newState);
                    this.setState({ newState });
                })
                .catch(reason => {
                    console.log(reason)
                });
        }, 3000);
    }

    /********************************
    ------------  START  ------------
    ********************************/

    setTeamCode(e) {
        const teamCode = e.target.value;
        this.setState({ teamCode });

        if (teamCode.length === 5) {
            axios.get(`/api/teams/${teamCode}`)
                .then(res => {
                    const team = res.data;
                    axios.post('/api/state', { teamCode });
                    this.setScheduleID(team);
                    this.matchBFCTeam(team);
                });
        }
    }

    setScheduleID(team) {
        const scheduleID = team.map((team) => team.league.scheduleID)[0];
        this.setState({ scheduleID });

        axios.get(`/api/schedules/${scheduleID}`)
            .then(res => {
                const schedule = res.data;
                axios.post('/api/state', { scheduleID });
                this.matchOPPTeam(schedule);
                this.matchLengthOfHalf(schedule);
            });
    }

    matchBFCTeam(team) {
        const teamBFC = team.map((team) => team.name)[0];
        this.setState({ teamBFC });
        this.setState({ teamCodeMatched: true });
        axios.post('/api/state', { teamBFC, teamCodeMatched: true });
    }

    matchOPPTeam(schedule) {
        const teamOPP = schedule[0].games.filter((game) => game.gameDay === 1).map((game) => game.opponent)[0];
        this.setState({ teamOPP });
        axios.post('/api/state', { teamOPP });
    }

    matchLengthOfHalf(schedule) {
        const lengthOfHalf = schedule[0].lengthOfHalfs;
        this.setState({ lengthOfHalf });
        axios.post('/api/state', { lengthOfHalf });
    }

    /********************************
    ------------ SETTINGS -----------
    ********************************/

    setOPPTeam(e) {
        const teamOPP = e.target.value;
        this.setState({ teamOPP });
    }

    handleFormationSelected = (formationName) => {
        this.setState({ format: formationName });
    }

    handleLengthOfHalfSelected(lengthAdjuster) {
        this.setState({ lengthOfHalf: this.state.lengthOfHalf + (lengthAdjuster * 60) })
    }

    /********************************
    ------------- ROSTER ------------
    ********************************/

    handleToggle = (id) => {
        const player = findById(id, this.state.roster)
        const toggled = togglePlayer(player)
        const updatedRoster = updatePlayer(this.state.roster, toggled)

        this.setState({ roster: updatedRoster })
        axios.post('/api/state', { roster: updatedRoster });

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
        const toggleYellow = (player) => ({ ...player, firstYellow: !player.firstYellow })
        const toggled = toggleYellow(player)
        const updatedRoster = updatePlayer(this.state.roster, toggled)
        this.setState({ roster: updatedRoster })

        const roster = this.state.roster;
        const event = "yc"
        const firstYellow = updatedRoster[roster.indexOf(player)].firstYellow;
        const yellowCards = updatedRoster[roster.indexOf(player)].yellowCards;

        firstYellow === true
            ? updatePlayer(updatedRoster, yellowCards.push(this.state.timeLive))
            : updatePlayer(updatedRoster, yellowCards.pop())

        this.snapGoalsBFC(player, event);
    }

    handleSecondYellow = (id) => {
        const player = findById(id, this.state.roster)
        const toggleYellow = (player) => ({ ...player, secondYellow: !player.secondYellow })
        const toggled = toggleYellow(player)
        const updatedRoster = updatePlayer(this.state.roster, toggled)

        this.setState({ roster: updatedRoster });

        const roster = this.state.roster;
        const event = "yy"
        const secondYellow = updatedRoster[roster.indexOf(player)].secondYellow;
        const yellowCards = updatedRoster[roster.indexOf(player)].yellowCards;

        secondYellow === true
            ? updatePlayer(updatedRoster, yellowCards.push(this.state.timeLive))
            : updatePlayer(updatedRoster, yellowCards.pop())

        this.snapGoalsBFC(player, event);
    }

    handleRed = (id) => {
        const player = findById(id, this.state.roster)
        const roster = this.state.roster;
        const event = "rc"
        const redCard = roster[roster.indexOf(player)].redCard;

        redCard.length === 0
            ? updatePlayer(roster, redCard.push(this.state.timeLive))
            : updatePlayer(roster, redCard.pop())

        this.setState({ roster });

        this.snapGoalsBFC(player, event);
    }

    handlePlayerGoals = (id) => {
        const player = findById(id, this.state.roster)
        const roster = this.state.roster;
        const event = "goal"
        const playerGoals = roster[roster.indexOf(player)].goals;
        updatePlayer(roster, playerGoals.push(this.state.timeLive));
        this.setState({ roster });

        this.addGoalBFC();
        this.snapGoalsBFC(player, event);

        const tweetKey = "playerScored";
        const scorer = `${player.firstName} ${player.lastName}`;
        const scorerHandle = "";
        const min = (Math.ceil(this.state.timeLive / 60)) + "'";
        const teamBFC = this.state.teamBFC;
        const teamOPP = this.state.teamOPP;

        setTimeout(() => {
            const beyondScore = this.state.beyondScore;
            const oppScore = this.state.oppScore;
            this.triggerTweet(tweetKey, min, teamOPP, teamBFC, oppScore, beyondScore, scorer, scorerHandle)
        }, 3000);
    }

    handlePlayerAssists = (id) => {
        const player = findById(id, this.state.roster)
        const roster = this.state.roster;
        const event = "assist"
        const playerAssists = roster[roster.indexOf(player)].assists;
        updatePlayer(roster, playerAssists.push(this.state.timeLive))
        this.setState({ roster })
        this.snapGoalsBFC(player, event);
    }

    handlePlayerOwnGoals = (id) => {
        const player = findById(id, this.state.roster)
        const roster = this.state.roster;
        const playerOwnGoals = roster[roster.indexOf(player)].ownGoals;
        updatePlayer(roster, playerOwnGoals.push(this.state.timeLive))
        console.log(roster[roster.indexOf(player)].ownGoals);
        this.setState({ roster })
    }

    /********************************
    ------------- BFC Live ------------
    ********************************/

    addGoalBFC(e) {
        var score = this.state.beyondScore;
        if (this.state.timeLive === 0) {
            alert("Start the game first!");
        } else if (this.state.currentButtonState === 2) {
            alert("Restart game first!");
        } else if (this.state.currentButtonState === 5) {
            alert("Game ended!");
        } else {
            this.setState({ beyondScore: score + 1 })
            axios.post('/api/state', { beyondScore: score + 1 });
            // this.snapGoalsBFC();
        }
    }

    addGoalOPP(e) {
        var score = this.state.oppScore;
        if (this.state.timeLive === 0) {
            alert("Start the game first!");
        } else if (this.state.currentButtonState === 2) {
            alert("Restart game first!");
        } else if (this.state.currentButtonState === 4) {
            alert("Game ended!");
        } else {
            this.setState({ oppScore: score + 1 })
            axios.post('/api/state', { oppScore: score + 1 });

            this.snapGoalsOPP();

            const tweetKey = "opponentScored"
            const min = (Math.ceil(this.state.timeLive / 60)) + "'";
            const teamBFC = this.state.teamBFC;
            const teamOPP = this.state.teamOPP;

            setTimeout(() => {
                const beyondScore = this.state.beyondScore;
                const oppScore = this.state.oppScore;
                this.triggerTweet(tweetKey, min, teamOPP, teamBFC, oppScore, beyondScore)
            }, 3000);
        }
    }

    ///////////// Twitter function ////////////////

    toggleTweetUpdates(e) {
        const tweets = !this.state.tweetUpdates
        this.setState({ tweetUpdates: tweets })
    }

    // const urlParams = new URLSearchParams(window.location.search);

    // const tweet = urlParams.get('tweet') || 'The opponent has scored a goal!';
    triggerTweet(tweetKey, min, teamOPP, teamBFC, oppScore, beyondScore, scorer, scorerHandle) {

        const tweetUpdates = this.state.tweetUpdates;

        if (tweetUpdates) {
            // const tweet = `${this.state.teamOPP} has scored a goal!`;
            const tweet = Tweets(tweetKey, min, teamOPP, teamBFC, oppScore, beyondScore, scorer, scorerHandle);
            const jimpData = { tweetKey, min, teamOPP, teamBFC, oppScore, beyondScore, scorer, scorerHandle }

            // const backend = 'https://nodejavascript.herokuapp.com';

            fetch('/api/tweet', {
                method: 'POST',
                mode: 'cors',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ tweet, jimpData })
            })
                .then(response => response.json())
                .then((data) => {
                    console.log({ data });
                });
        }
    }

    ///////////// end ////////////////////

    startStopMatch(e) {
        const buttonStateCounter = this.state.currentButtonState;

        if (this.state.clockState === false) {
            this.setState({ clockState: true, currentButtonState: buttonStateCounter + 1 });
            timer = setInterval(() => { this.setState({ timeLive: this.state.timeLive + 1 }) }, 1000);
        } else if (this.state.clockState === true && this.state.currentButtonState === 1) {
            this.setState({ clockState: false, currentButtonState: buttonStateCounter + 1, timeLive: this.state.lengthOfHalf })
            clearInterval(timer);
        } else if (this.state.clockState) {
            this.setState({ clockState: false, currentButtonState: buttonStateCounter + 1 })
            clearInterval(timer);
        }

        const snapTimerState = (e) => {
            const prevLister = this.state.lister;
            const newListerItem = <TimerState
                timeLive={this.state.timeLive}
                currentButtonState={this.state.currentButtonState}
            />
            const newLister = [newListerItem, ...prevLister];
            this.setState({ lister: newLister })
            axios.post('/api/state', { lister: newLister })
        }

        if (buttonStateCounter < 4) {
            var tweetKey = "";

            if (buttonStateCounter === 0) {
                tweetKey = "gameStarted"
            } else if (buttonStateCounter === 1) {
                tweetKey = "halfTime"
            } else if (buttonStateCounter === 2) {
                tweetKey = "secondHalf"
            } else if (buttonStateCounter === 3) {
                tweetKey = "finalScore"
            }

            const min = (Math.ceil(this.state.timeLive / 60)) + "'";
            const teamBFC = this.state.teamBFC;
            const teamOPP = this.state.teamOPP;
            const beyondScore = this.state.beyondScore;
            const oppScore = this.state.oppScore;

            this.triggerTweet(tweetKey, min, teamOPP, teamBFC, oppScore, beyondScore);
        }
        snapTimerState();
    }

    fastForward(mins) {
        const currentTime = this.state.timeLive;
        const adjustedTime = currentTime + mins;
        this.setState({ timeLive: adjustedTime });
        axios.post('/api/state', { timeLive: adjustedTime })
    }

    snapGoalsBFC(player, event) {
        const prevLister = this.state.lister;
        const newListerItem = <GoalsBFC
            timeLive={this.state.timeLive}
            currentButtonState={this.state.currentButtonState}
            lengthOfHalf={this.state.lengthOfHalf}
            lengthOfGame={this.state.lengthOfGame}
            roster={this.state.roster}
            scorer={player}
            event={event}
        />
        const newLister = [newListerItem, ...prevLister];
        this.setState({ lister: newLister })
        axios.post('/api/state', { newLister })
    }

    snapGoalsOPP(e) {
        const prevLister = this.state.lister;
        const newListerItem = <GoalsOPP
            timeLive={this.state.timeLive}
            currentButtonState={this.state.currentButtonState}
            lengthOfHalf={this.state.lengthOfHalf}
            lengthOfGame={this.state.lengthOfGame}
        />
        const newLister = [newListerItem, ...prevLister];
        this.setState({ lister: newLister })
        axios.post('/api/state', { newLister })
    }

    handleSentimentSelected = (sentiment) => {
        const sentimentSplit = sentiment.split(" ");
        const sentimentSplitZero = sentimentSplit[0].toLowerCase();
        const sentimentKey = sentimentSplitZero + sentimentSplit[1];
        this.setState({ sentiment: sentimentKey });
        axios.post('/api/state', { sentiment: sentimentKey })
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 "></div>
                        <div className="col-sm-4 bfc-live">
                            <Route exact path="/" render={() => <Redirect to="/welcome" />} />
                            <Route path="/welcome" render={() => <Welcome />} />
                            <Route path="/start" render={() => <Start
                                setTeamCode={this.setTeamCode.bind(this)}
                                teamCode={this.state.teamCode}
                                teams={this.state.teams}
                                teamCodeMatched={this.state.teamCodeMatched}
                            />} />
                            <Route path="/settings" render={() => <Settings
                                setBFCTeam={this.setBFCTeam.bind(this)}
                                setOPPTeam={this.setOPPTeam.bind(this)}
                                teamBFC={this.state.teamBFC}
                                teamOPP={this.state.teamOPP}
                                format={this.state.format}
                                data={this.state.data}
                                pollInterval={this.state.pollInterval}
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
                                handleSentimentSelected={this.handleSentimentSelected.bind(this)}
                                sentiment={this.state.sentiment}
                            />}
                            />
                            <Route path="/fanview" render={() => <Fanview
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
                                handleSentimentSelected={this.handleSentimentSelected.bind(this)}
                                sentiment={this.state.sentiment}
                            />}
                            />
                            <Route path="/roster" render={() => <Roster
                                roster={this.state.roster}
                                teamCode={this.state.teamCode}
                                handlePlayerToggle={this.handleToggle.bind(this)}
                                handleFirstYellow={this.handleFirstYellow.bind(this)}
                                handleSecondYellow={this.handleSecondYellow.bind(this)}
                                handleRed={this.handleRed.bind(this)}
                                handlePlayerGoals={this.handlePlayerGoals}
                                handlePlayerAssists={this.handlePlayerAssists}
                                handlePlayerOwnGoals={this.handlePlayerOwnGoals}
                                clockState={this.state.clockState}
                                format={this.props.format}
                                currentButtonState={this.state.currentButtonState}
                                timeLive={this.state.timeLive}
                                teamBFC={this.state.teamBFC}
                                beyondScore={this.state.beyondScore}
                                addGoalBFC={this.addGoalBFC.bind(this)}
                                teamOPP={this.state.teamOPP}
                                oppScore={this.state.oppScore}
                                addGoalOPP={this.addGoalOPP.bind(this)}
                                lengthOfHalf={this.state.lengthOfHalf}
                                lengthOfGame={this.state.lengthOfGame}
                                startStopMatch={this.startStopMatch.bind(this)}
                                fastForward={this.fastForward.bind(this)}
                                snapGoalsBFC={this.snapGoalsBFC.bind(this)}
                                snapGoalsOPP={this.snapGoalsOPP.bind(this)}
                                handleSentimentSelected={this.handleSentimentSelected.bind(this)}
                                sentiment={this.state.sentiment}
                                tweetUpdates={this.state.tweetUpdates}
                                toggleTweetUpdates={this.toggleTweetUpdates.bind(this)}
                            />}
                            />
                            <Route path="/players/:id" render={(props) => <PlayerDetailsPage
                                roster={this.state.roster}
                                handleToggle={this.handleToggle}
                                {...props}
                            />}
                            />
                            <Route path="/game-report" render={() => <GameReport
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
                                sentiment={this.state.sentiment}
                                roster={this.state.roster}
                            />}
                            />
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
