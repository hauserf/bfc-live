import React from 'react';
import { NavLink } from 'react-router-dom';

const ScheduleItem = (props) => {

    // const handleFormationSelected = props.handleFormationSelected.bind(null, props.name + 'v' + props.name);
    const setTeamCode = props.setTeamCode.bind(null, props.teamCode);

    return (
      <NavLink activeStyle={{ 'textDecoration': 'none' }} to="/roster" >
        <div className="s-item" onClick={setTeamCode}>
          <div>
            <div className="s-time" >{props.date}</div>
          </div>
          <div>
            <div className="" >{props.hometeam}</div>
            <div className="" ><span className="s-vs">vs </span>{props.awayteam}</div>
          </div>
        </div>
      </NavLink>
    )
}
export default ScheduleItem;
