


// NOTES////

///THIS IS HOW TO CHANGE THE STATE
//     state = {
//    ...state,
//    roster: roster.push
//  }

let initialState = {
  roster: [],
  timeLive : 0,
  clockState: false,
  lengthOfHalf: 2700,
  lengthOfGame: 5400,
  teamBFC: "BFC Team",
  teamOPP: "Opponent",
  beyondScore: 0,
  oppScore: 0,
  currentButtonState: 0,
  lister:[],
  format: "11v11",
  sentiment: "inputNeeded"
}

const BFCreducer = (state = initialState, action) => {
  switch (action.type) {
       //action type
    case "SENTIMENT_SELECTED_HANDLER":

    console.log("clicked", action.payload);

      return state
      break
    default:
  }
  return state
}
export default BFCreducer
