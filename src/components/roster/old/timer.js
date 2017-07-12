import React, { Component } from 'react';

// class Timer extends Component {
//   render() {
//     return (
//       <div className="stopwatch">
//         <div className="stopwatch-time"> 00 : 00 : 00 </div>
//         <button className="start-stop">Start Game</button>
//       </div>
//     )
//   }
// }

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('00' + sec % 60).slice(-2)


class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: this.props.secondsElapsed,
      laps: this.props.timeStamp,
      lastClearedIncrementer: this.props.lastClearedIncrementer,
    };
    this.incrementer = null;
  }

  recordClick(click) {
    return (
      this.props.triggeredBtnEvents( this.props.buttonEvent + click)
    )

  }

  handleStartClick() {
    this.incrementer = setInterval( () =>
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      })
    , 1000);

    this.recordClick(1);

  }

  handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer,
    });
      this.recordClick(1);
  }

  handleResetClick() {
    clearInterval(this.incrementer);
    this.setState({
      secondsElapsed: 0,
      laps: []
    });
  }



  this.props.getGoalMins() {
    this.setState({
      laps: this.state.laps.concat([this.state.secondsElapsed])
    })
  }



  render() {
    const labelIterator = this.props.buttonEvent;
    const buttonLabel = this.props.timerEvents[labelIterator].btnName;

    console.log(this.state.laps)

    return (
      <div className="stopwatch">
        {/* {(
        this.state.secondsElapsed === 0 ||
        this.incrementer === this.state.lastClearedIncrementer
        ? <Button onClick={this.handleStartClick.bind(this)}>Resume</Button>
        : <Button className="stop-stop" onClick={this.handleStopClick.bind(this)}>Pause</Button>
        )} */}

        <div className="stopwatch-time">{formattedSeconds(this.state.secondsElapsed)}</div>
        { (this.props.buttonEvent < 4
            ?(
            this.state.secondsElapsed === 0 ||
            this.incrementer === this.state.lastClearedIncrementer
            ? <Button className="start-stop" onClick={this.handleStartClick.bind(this)}>{buttonLabel}</Button>
            : <Button className="stop-stop" onClick={this.handleStopClick.bind(this)}>{buttonLabel}</Button>
            )
            :
            <div className="game-ended text-danger">Game has ended</div>
          )
        }

        {/* {(<div>
            <button type="button" data-toggle="collapse" data-target="#collapseTimerOptions" aria-expanded="false" aria-controls="collapseTimerOptions">
            |||
            </button>
            <div className="collapse" id="collapseTimerOptions">
              <div className="card card-block">
                STOP | PAUSE | RESET | ADD 30 seconds | Deduct 30 seconds
              </div>
            </div>
          </div>
        )} */}

        {(this.state.secondsElapsed !== 0 &&
          this.incrementer !== this.state.lastClearedIncrementer
          ? <Button onClick={this.handleLabClick.bind(this)}>lab</Button>
          : null
        )}


        {/* {(this.state.secondsElapsed !== 0 &&
          this.incrementer === this.state.lastClearedIncrementer
          ? <Button onClick={this.handleResetClick.bind(this)}>reset</Button>
          : null
        )} */}

        <ul className="stopwatch-laps">
          { this.state.laps.map((lap, i) =>
              <li className="stopwatch-lap"><strong>{i + 1}</strong>/ {formattedSeconds(lap)}</li>)
          }
        </ul>
      </div>
    );
  }
}

/** verbose component before 0.14
class Button extends React.Component {
  render() {
    return <button type="button" {...this.props}
                   className={"btn " + this.props.className } />;
  }
}
*/

const Button = (props) =>
  <button type="button" {...props} className={"btn " + props.className } />;


export default Timer;
