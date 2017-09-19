import React from 'react';
import StatsCounterBtn from './stats-counter-btn';

const StatsCounter = (props) => {

  return (
    <div>
      <div className="flex-con flex-dir-row flex-g-2">
        <StatsCounterBtn name='-'  />
        <p className="text-warning text-center stats-counter"> {props.format} </p>
        <StatsCounterBtn name='+' />
      </div>
    </div>
  );
}

export default StatsCounter;
