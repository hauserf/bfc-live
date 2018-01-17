import React from 'react';
import ScheduleItem from './schedule-item';

const Schedule = (props) => {

  // const handleFormationSelected = props.handleFormationSelected.bind(this);
  const setTeamCode = props.setTeamCode.bind(this);

  return (
    <div className="flex-con flex-dir-col">
        <p className="s-title">UPCOMING GAMES</p>
        <div className="flex-con flex-dir-col flex-g-2">
            <ScheduleItem
              hometeam='BFC Reserve'
              awayteam='Polonia Gwardia NY'
              date='Sun, Feb 12 | 10:00 AM'
              teamCode='22222'
              setTeamCode={setTeamCode} />
            <ScheduleItem
              hometeam='Manhattan Kickers'
              awayteam='Sporting Astoria'
              date='Sun, Feb 12 | 12:00 PM'
              teamCode='11111'
              setTeamCode={setTeamCode} />
            <ScheduleItem
              hometeam='BFC Metro'
              awayteam='Manhattan Kickers'
              date='Sun, Feb 12 | 4:00 PM'
              teamCode='33333'
              setTeamCode={setTeamCode} />
        </div>
    </div>
  );
}

export default Schedule;
