import React from 'react';
import PlayerStatsItem from './player-stats-item';
import { AppLang } from '../data/applang';

const PlayerGameStats = (props) => {

  const applang = props.applang;
  const copy = AppLang.views.playerDetails;

  return (
    <div className="flex-con flex-dir-col">
      <PlayerStatsItem
        name={copy.playerGameStats.goals[applang]}
      />
      <PlayerStatsItem
        name={copy.playerGameStats.assists[applang]}
      />
      <PlayerStatsItem
        name={copy.playerGameStats.passes[applang]}
      />
      <PlayerStatsItem
        name={copy.playerGameStats.touches[applang]}
      />
      <PlayerStatsItem
        name={copy.playerGameStats.crosses[applang]}
      />
      <PlayerStatsItem
        name={copy.playerGameStats.shots[applang]}
      />
    </div>
  )
};

export default PlayerGameStats;
