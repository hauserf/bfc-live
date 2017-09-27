import React from 'react';
import StatsCounterBtn from './stats-counter-btn'

const PlayerStatsItem = (props) => {
  return (
    <div className="stats-item">
      <div className="flex-con flex-dir-row flex-g-2 mb-2">
        <StatsCounterBtn name="-"/>
        <div>
          <div className="mx-2">{props.name}</div>
          <div className="stats-value">0</div>
        </div>
        <StatsCounterBtn name="+"/>
      </div>

    </div>
  )
};

export default PlayerStatsItem;
