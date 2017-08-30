import React from 'react';

const SettingOpponent = (props) => {

  const setOPPTeam = props.setOPPTeam.bind(this);

  return (
    <div className="flex-con flex-dir-col">
        <p>Opponent:</p>
        <input
            value={props.teamOPP}
            onChange={setOPPTeam} />
    </div>
  );
}

export default SettingOpponent;
