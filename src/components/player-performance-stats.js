import React from 'react';
import PlayerHealthItem from './player-health-item';
import { AppLang } from '../data/applang';

const PlayerPerformanceStats = (props) => {

  const applang = props.applang;
  const copy = AppLang.views.playerDetails;

  return (
    <div className="flex-con flex-dir-col">
      <PlayerHealthItem
        name={copy.playerPerformanceStats.heartRate[applang]}
      />
      <PlayerHealthItem
        name={copy.playerPerformanceStats.distance[applang]}
      />
      <PlayerHealthItem
        name={copy.playerPerformanceStats.sprints[applang]}
      />
      <PlayerHealthItem
        name={copy.playerPerformanceStats.maxSpeed[applang]}
      />

    </div>
  )
};

export default PlayerPerformanceStats;
