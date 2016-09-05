module.exports = {
  removeTeamColors: removeTeamColors
};

function removeTeamColors(games) {
  Object.keys(games).forEach(function(gameId) {
    var game = games[gameId];
    if (!('team1Wins' in game)) {
      game.team1Wins = game.team1WinsBlack + game.team1WinsYellow;
      game.team2Wins = game.team2WinsBlack + game.team2WinsYellow;
      delete game.team1WinsBlack;
      delete game.team1WinsYellow;
      delete game.team2WinsBlack;
      delete game.team2WinsYellow;
      games[gameId] = game;
    }
  });
  return games;
}
