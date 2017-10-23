

export const Tweets = (tweetKey, min, teamOPP, teamBFC, oppScore, beyondScore, scorer, scorerHandle) => {

 const twitterUpdates = {
  gameStarted: [
    `${teamBFC} vs ${teamOPP} is underway!`,
    `${teamBFC} vs ${teamOPP} Let's go!`
  ],
  halfTime: [
    `It's halftime in NYC: ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`,
    `First half ends: ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`
  ],
  secondHalf: [
    `And we're back! ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`,
    `Second half begins ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`,
  ],
  finalScore: [
    `Final score ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`,
    `And here's the final whistle: ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`
  ],
  opponentScored: [
    `${teamOPP} scored in the ${min} min. ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`
  ],
  BFCTeamScored: [
    `Beyond F.C. scores again.`
  ],
  playerScored: [
    `${scorer} scores for ${teamBFC} against ${teamOPP} in the ${min} min of the game. ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`
  ]
}
  const tweetVersions = twitterUpdates[tweetKey].length
  const update = twitterUpdates[tweetKey][Math.floor(Math.random() * tweetVersions)]

  return update
};

//
// ({
//   gameStarted: [`${teamBFC} vs ${teamOPP} is underway. #GoBeyond`, "Let's go"],
//   halfTime: [`It's halftime in NYC: ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`],
//   secondHalf: [`And we're back! ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`, "back again"],
//   finalScore: [`Final score ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`],
//   opponentScored: [`${teamOPP} scored in the ${min} min. ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`],
//   BFCTeamScored: [`Beyond F.C. scores again.`],
//   playerScored: [`${scorer} scores for ${teamBFC} against ${teamOPP} in the ${min} min of the game. ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`]
// }[tweetKey][1])
