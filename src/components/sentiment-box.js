import React, { Component } from 'react';
import SentimentSelector from './subcomponents/sentiment-selector';
import { GameReportsTemplate } from '../data/game-reports';

export default class SentimentBox extends Component {

  handleSentimentSelected = (sentiment) => {
    this.props.handleSentimentSelected(sentiment);
  }

  render() {

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
          return 1
        } else if (this.props.beyondScore < this.props.oppScore) {
            return 2
          } else return "Game report cannot be processed"
    }

    const templates = GameReportsTemplate;
    const sentimentFilter = templates[outcomeFilterIndex()][outcomeFilter()].sentiments;

    return (
      <div>
        <div className="sentiment-list-title">How would you characterize the {outcomeFilter()}?</div>

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
