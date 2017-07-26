import React from 'react';
import { Link } from 'react-router-dom';

const SentimentSelector = (props) => {
  const handleSentimentSelected = props.handleSentimentSelected.bind(null, props.name)
  return (
    <Link to="/game-report" style={{ textDecoration: "none"}}>
      <div className="sentiment" onClick={handleSentimentSelected}>{props.name}</div>
    </Link>
  )
}

export default SentimentSelector;
