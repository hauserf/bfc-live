import React from 'react';
import { Link } from 'react-router-dom';


//CONNECT AND CHANGE STATE IN STORE
 import {connect} from "react-redux"

 //Dispatcher
 const mapDispatchToProps = dispatch => {
   return {
     sentimentSelectedHandler:name => {
       dispatch({type: "SENTIMENT_SELECTED_HANDLER", payload: name})
     }
   }
 }

const SentimentSelector = (props) => {
  const handleSentimentSelected = props.handleSentimentSelected.bind(null, props.name)
  return (
    <Link to="/game-report" style={{ textDecoration: "none"}}>
      <div className="sentiment" onClick={()=>{
        props.sentimentSelectedHandler(props.name)
      }}>{props.name}</div>
    </Link>
  )
}

export default connect(null, mapDispatchToProps)(SentimentSelector)
