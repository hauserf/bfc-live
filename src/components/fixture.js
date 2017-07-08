import React from 'react';

const Fixture = ({ score, scoreChange, triggerBtnEvent, buttonEvent}) => {

  const newScore = (delta) => {
    return (
      scoreChange(score + delta)
    )

    // return (
    //   buttonEvent === 1 || buttonEvent === 3
    //   ? scoreChange(score + delta)
    //   : null
    // )
  }

    return (
      <div className="home">
        <div className="hometeam"> Beyond FC </div>
        <div className="score"> {score} </div>
        <button className="score-action increment" onClick={() => newScore(+1)}> + </button>
      </div>
    )

}

export default Fixture;
