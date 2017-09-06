

export const Tweets = (tweetKey, teamOPP, scorer, scorerHandle, min, teamBFC) => ({
    opponentScored: `${teamOPP} scored a goal. More details to follow...`,
    BFCTeamScored: `Beyond F.C. scores again.`,
    playerScored: `${scorer} ${scorerHandle} scores for ${teamBFC} against ${teamOPP} in the ${min} min of the game.`
  }[tweetKey]);
