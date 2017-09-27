import React from 'react';
import PlayerHealthItem from './player-health-item';

const PlayerPerformanceStats = (props) => {
  return (
    <div className="flex-con flex-dir-col">
      <PlayerHealthItem
        name="Heart rate"
      />
      <PlayerHealthItem
        name="Distance"
      />
      <PlayerHealthItem
        name="# of Sprints"
      />
      <PlayerHealthItem
        name="Max speed"
      />

    </div>
  )
};

export default PlayerPerformanceStats;
