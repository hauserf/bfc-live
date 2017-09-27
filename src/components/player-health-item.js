import React from 'react';

const PlayerHealthItem = (props) => {
  return (

    <div className="stats-item my-2">
      {/* <div className="flex-con flex-dir-row flex-g-2 mb-2"> */}
          <div className="mx-2">{props.name}</div>
          <div className="stats-value">0</div>
      {/* </div> */}

    </div>


  )
};

export default PlayerHealthItem;
