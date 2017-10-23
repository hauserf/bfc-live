import React from 'react';
import SentimentBox from './sentiment-box';
import { AppLang } from '../data/applang';

const GameEnded = (props) => {

  const handleSentimentSelected = props.handleSentimentSelected.bind(this);

  const applang = props.applang;
  const copy = AppLang.views.gameEnded;

  return (
    <div>
      <div>
        <div className="game-ended text-danger">{copy.gameEnded[applang]}</div>
      </div>
      <div>
        <SentimentBox
          handleSentimentSelected={handleSentimentSelected}
          oppScore={props.oppScore}
          beyondScore={props.beyondScore}
          applang={props.applang}
        />
      </div>
    </div>
  )
}

export default GameEnded;
