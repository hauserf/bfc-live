import React from 'react';

const TimeCounter = (props) => {
    return (
      <div className="stopwatch-time">
        {("0" + Math.floor(props.time / 60)).slice(-2) + ":" + ("0" + props.time % 60).slice(-2)}
      </div>
    );
}

export default TimeCounter;
