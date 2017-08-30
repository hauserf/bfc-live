import React from 'react';
import LengthOfHalfSelector from './length-halfs-selector';

const Length = (props) => {

  const handleLengthOfHalfSelected = props.handleLengthOfHalfSelected.bind(this);
  const lengthOfHalf = Math.ceil(props.lengthOfHalf / 60) + "'"

  return (
    <div className="flex-con flex-dir-col">
        <p className="flex-g-1 pt-1">Length of Halfs:</p>
        <div className="flex-g-1">
            <h4 className="text-warning flex-g-1 text-center settings-data"> {lengthOfHalf} </h4>
        </div>
        <div className="flex-con flex-dir-row">
            <LengthOfHalfSelector name="-10"
            handleLengthOfHalfSelected={handleLengthOfHalfSelected}/>
            <LengthOfHalfSelector name="-5"
            handleLengthOfHalfSelected={handleLengthOfHalfSelected}/>
            <LengthOfHalfSelector name="-1"
            handleLengthOfHalfSelected={handleLengthOfHalfSelected}/>
            <LengthOfHalfSelector name="+1"
            handleLengthOfHalfSelected={handleLengthOfHalfSelected}/>
            <LengthOfHalfSelector name="+5"
            handleLengthOfHalfSelected={handleLengthOfHalfSelected}/>
            <LengthOfHalfSelector name="+10"
            handleLengthOfHalfSelected={handleLengthOfHalfSelected}/>
        </div>
    </div>
  );
}

export default Length;
