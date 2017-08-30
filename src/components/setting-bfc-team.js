import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const SettingBFCTeam = (props) => {

  const setBFCTeam = props.setBFCTeam.bind(this);

  console.log("Teams", props.data);

  return (
    <div className="flex-con flex-dir-col">
        <p>BFC Team:</p>
        <Dropdown placeholder='Select a team' fluid selection options={props.data} onChange={setBFCTeam}/>

    </div>

  );
}

export default SettingBFCTeam;
