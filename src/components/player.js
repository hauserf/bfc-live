import React from 'react';
import PropTypes from 'prop-types';


export const Player = (props) => {
    const handleToggle = props.handleToggle.bind(null, props.id);
    const handleFirstYellow = props.handleFirstYellow.bind(null, props.id);
    const handleSecondYellow = props.handleSecondYellow.bind(null, props.id);
    const handleRed = props.handleRed.bind(null, props.id);
    const handlePlayerGoals = props.handlePlayerGoals.bind(null, props.id);
    const handlePlayerAssists = props.handlePlayerAssists.bind(null, props.id);

    // minutesPlayed current interval

    const latestSubIn = props.subIns[props.subIns.length - 1];
    const minutesPlayedCurrentInterval = props.timeLive - latestSubIn

    // total minutesPlayed

    const playerSubIns = props.subIns;
    const playerSubOuts = props.subOuts;

    const playerMinutes = (subCeil) => {
      let minutesPlayed = 0;
        for (let i = 0; i < subCeil ; i += 1) {
          minutesPlayed += playerSubOuts[i] - playerSubIns[i]
        }
      return minutesPlayed
    };

    const currentInterval = props.timeLive - latestSubIn;
    const playerMinutesRunning = playerMinutes(playerSubOuts.length) + currentInterval;

    const updateMinutes = () => {
      if (playerSubIns.length === 0) {
        return 0
      } else if (playerSubIns.length === 1 && playerSubOuts === 0) {
          return currentInterval
        } else if (playerSubIns.length > playerSubOuts.length){
            return playerMinutesRunning
          } else {
              return playerMinutes(playerSubIns.length)
            }
    }

    // minutes of yellowCards
    const timeOfFirstYellows = (Math.ceil(props.yellowCards[0] / 60) + "'");
    const timeOfSecondYellows = (Math.ceil(props.yellowCards[1] / 60) + "'");
    const timeOfRedCard = (Math.ceil(props.redCard[0] / 60) + "'");

    // goals array
    // const playerGoals = () => {
    //   for (var i = 0; i < props.goals.length; i += 1) {
    //   return ("Goal" + (Math.ceil(props.goals[i] / 60) + "'"))
    //   }
    // }
    // console.log(props.goals.length, playerGoals());


    return (


          <div className=
            {props.redCard.length === 1 || props.secondYellow === true
              ? "player red-carded"
              : "player"
            }>
            <div className="player-names" onClick={handleToggle}>
                {props.firstName}
            </div>
            <div className="goals-assists" >
                <div className="goals">
                 {props.goals
                   .map((goal, id) => {
                   return <img className="roster-icon-mini" key={id} src="soccer-ball.png" alt="icon8 - goal" />}
                 )}{props.assists
                   .map((assist, id) => {
                   return <img className="roster-icon-mini" key={id} src="gift.png" alt="icon8 - goal" /> }
                 )}
                </div>
            </div>
            { props.playerActive === true && props.clockState === true
              ? (
                  <div className="player-stats record-goals" onClick={handlePlayerGoals}>

                  </div>
                )
              : null
            }
            { props.playerActive === true && props.clockState === true
              ? (
                  <div className="player-stats record-assists" onClick={handlePlayerAssists}>

                  </div>
                )
              : null
            }
            { props.firstYellow === false && props.redCard.length === 1
              ? null
              : props.firstYellow === true
                ? <div className="player-stats first-yellow-active" onClick={handleFirstYellow}>
                    {timeOfFirstYellows}
                  </div>
                : <div className="player-stats first-yellow" onClick={handleFirstYellow}>

                  </div>
            }

            { props.firstYellow === false || props.redCard.length === 1
              ? null
              : props.firstYellow === true && props.secondYellow === true
                ? <div className="player-stats second-yellow-active" onClick={handleSecondYellow}>
                    {timeOfSecondYellows}
                  </div>
                : <div className="player-stats second-yellow" onClick={handleSecondYellow}>

                  </div>
            }
            { props.secondYellow === true && props.firstYellow === true
              ? null
              : props.redCard.length === 1
                ? <div className="player-stats red-card-active" onClick={handleRed}>
                    {timeOfRedCard}
                  </div>
                : <div className="player-stats red-card" onClick={handleRed}>

                  </div>
            }

            { minutesPlayedCurrentInterval === updateMinutes()
              ? null
              : props.playerActive === true
                ? <div className="player-minutes">{("0" + Math.floor(minutesPlayedCurrentInterval / 60)).slice(-2) + ":" + ("0" + minutesPlayedCurrentInterval % 60).slice(-2)}</div>
                : null
            }

            <div className="player-minutes">
                {("0" + Math.floor(updateMinutes() / 60)).slice(-2) + ":" + ("0" + updateMinutes() % 60).slice(-2)
                }
            </div>
        </div>
    )
}

Player.propTypes = {
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleFirstYellow: PropTypes.func.isRequired,
    handleSecondYellow: PropTypes.func.isRequired,
    handleRed: PropTypes.func.isRequired
}

Player.defaultProps = {}
