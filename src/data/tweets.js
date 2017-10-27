

export const Tweets = (tweetKey, min, teamOPP, teamBFC, oppScore, beyondScore, scorer, scorerHandle, clubDetails, bfcDetails, oppDetails) => {

  console.log(bfcDetails, clubDetails, min, teamOPP);

  var bfcTwitterHandle = "";
  var oppTwitterHandle = "";
  var leagueTwitterHandle = "";

  if (teamOPP[0] !== "Opponent") {
    bfcTwitterHandle = clubDetails.social.twitterHandle;
    oppTwitterHandle = oppDetails[0].oppSocial.twitterHandle;
    leagueTwitterHandle = bfcDetails[0].league.twitterHandle;
  }

  console.log(leagueTwitterHandle, clubDetails, min, oppTwitterHandle);

 const twitterUpdates = {
  gameStarted: [
    `${teamBFC} vs ${teamOPP} is underway! ${bfcTwitterHandle} ${oppTwitterHandle} ${leagueTwitterHandle}`,
    `${teamBFC} vs ${teamOPP} Let's go! ${bfcTwitterHandle} ${oppTwitterHandle} ${leagueTwitterHandle}`
  ],
  halfTime: [
    `It's halftime in NYC: ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`,
    `First half ends: ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`
  ],
  secondHalf: [
    `And we're back! ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP} ${bfcTwitterHandle} ${oppTwitterHandle} ${leagueTwitterHandle}`,
    `Second half begins ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP} ${bfcTwitterHandle} ${oppTwitterHandle} ${leagueTwitterHandle}`,
  ],
  finalScore: [
    `Final score ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP} ${bfcTwitterHandle} ${oppTwitterHandle} ${leagueTwitterHandle}`,
    `And here's the final whistle: ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP} ${bfcTwitterHandle} ${oppTwitterHandle} ${leagueTwitterHandle}`
  ],
  opponentScored: [
    `${teamOPP} scored in the ${min} min. ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP} ${oppTwitterHandle}`
  ],
  BFCTeamScored: [
    `Beyond F.C. scores again.`
  ],
  playerScored: [
    `${scorer} scores for ${teamBFC} in the ${min} min. ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP} ${bfcTwitterHandle} ${leagueTwitterHandle}`,
    `${scorer} scores for ${teamBFC} against ${teamOPP} in the ${min} min of the game. ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP} ${bfcTwitterHandle}`,
    `Goal for ${teamBFC}! ${scorer} scores in the ${min} min. ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP} ${bfcTwitterHandle}`
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
