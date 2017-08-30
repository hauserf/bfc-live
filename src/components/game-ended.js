import React from 'react';
import SentimentBox from './sentiment-box';

const GameEnded = (props) => {

  const handleSentimentSelected = props.handleSentimentSelected.bind(this);

  return (
    <div>
      <div>
        <div className="game-ended text-danger">Game ended</div>
      </div>
      <div>
        <SentimentBox
          handleSentimentSelected={handleSentimentSelected}
          oppScore={props.oppScore}
          beyondScore={props.beyondScore}
        />
      </div>
    </div>
  )
}

export default GameEnded;
