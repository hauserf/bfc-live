import React from 'react';
import { Link } from 'react-router-dom';

const StartInput = (props) => {

  const setTeamCode = props.setTeamCode.bind(this);

  return (
    <div className="flex-con flex-dir-col">
        <input
            placeholder={"12345"}
            value={props.teamCode}
            onChange={setTeamCode} />
        <div className="text-center">
        {props.teamCodeMatched === true
          ? <Link to="/roster" ><button className="input-btn bg-success">Load settings</button></Link>
          : null
        }

        {props.teamCode.length > 2 && props.teamCode.length !== 5
          ? <p className="alert alert-info mt-4"> Please enter a valid 5-digit team code. </p>
          : props.teamCode.length === 5 && props.teamCodeMatched === false
            ? <p className="alert alert-warning mt-4"> Sorry, the entered team code could not be found. Please try again. </p>
            : null
        }

        </div>
    </div>

  );
}

export default StartInput;
