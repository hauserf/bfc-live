

export const Tweets = (tweetKey, min, teamOPP, teamBFC, oppScore, beyondScore, scorer, scorerHandle) => ({
  gameStarted: `${teamBFC} vs ${teamOPP} is underway. #GoBeyond`,
  halfTime: `It's halftime in NYC: ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`,
  secondHalf: `And we're back! ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`,
  finalScore: `Final score ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`,
  opponentScored: `${teamOPP} scored in the ${min} min. ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`,
  BFCTeamScored: `Beyond F.C. scores again.`,
  playerScored: `${scorer} scores for ${teamBFC} against ${teamOPP} in the ${min} min of the game. ${teamBFC} ${beyondScore} : ${oppScore} ${teamOPP}`
}[tweetKey]);
