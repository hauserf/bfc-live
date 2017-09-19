import React from 'react';
import PlayerStatsItem from './player-stats-item';

const PlayerPerformanceStats = (props) => {
  return (
    <div className="flex-con flex-dir-col">
      <PlayerStatsItem
        name="Heart rate"
      />
      <PlayerStatsItem
        name="Distance"
      />
      <PlayerStatsItem
        name="# of Sprints"
      />
      <PlayerStatsItem
        name="Max speed"
      />
    
    </div>
  )
};

export default PlayerPerformanceStats;
