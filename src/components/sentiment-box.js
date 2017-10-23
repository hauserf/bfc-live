import React, { Component } from 'react';
import SentimentSelector from './sentiment-selector';
import { GameReportsTemplate } from '../data/game-reports';
import { AppLang } from '../data/applang';

export default class SentimentBox extends Component {

  handleSentimentSelected = (sentiment) => {
    this.props.handleSentimentSelected(sentiment);
  }

  render() {

    const applang = this.props.applang;
    const copy = AppLang.views.gameEnded;

    const outcomeFilter = () => {
      if (this.props.beyondScore > this.props.oppScore) {
        return "win"
      } else if (this.props.beyondScore === this.props.oppScore) {
          return "tie"
        } else if (this.props.beyondScore < this.props.oppScore) {
            return "defeat"
          } else return null
    }

    const outcomeFilterIndex = () => {
      if (this.props.beyondScore > this.props.oppScore) {
        return 0
      } else if (this.props.beyondScore === this.props.oppScore) {
          // return 1
          return 1
        } else if (this.props.beyondScore < this.props.oppScore) {
            return 2
          } else return copy.error[applang]
    }

    const templates = GameReportsTemplate;
    const sentimentFilter = templates[outcomeFilterIndex()][outcomeFilter()].sentiments;

    // const gameOutcome = outcomeFilter();
    // const outcomeQuestion = copy.sentimentBox.q(gameOutcome)
    //
    // console.log(outcomeQuestion);

    return (
      <div>
        <div className="sentiment-list-title">What do you think of the {outcomeFilter()}?</div>

        {sentimentFilter
            .map((sentiment, id) =>
            <SentimentSelector key={id} name={sentiment}
              handleSentimentSelected={this.handleSentimentSelected}/>
            )

          }


      </div>
    );
  }
}
