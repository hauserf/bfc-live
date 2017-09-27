import React from 'react';
import PlayerStatsItem from './player-stats-item';

const PlayerGameStats = (props) => {
  return (
    <div className="flex-con flex-dir-col">
      <PlayerStatsItem
        name="Goals"
      />
      <PlayerStatsItem
        name="Assists"
      />
      <PlayerStatsItem
        name="Passes"
      />
      <PlayerStatsItem
        name="Touches"
      />
      <PlayerStatsItem
        name="Crosses"
      />
      <PlayerStatsItem
        name="Shots"
      />
    </div>
  )
};

export default PlayerGameStats;
