var request = require('request');
var Promise = require('bluebird');

module.exports.parseFormData = function(data) {
  return data.split(', ').reduce(function(object, line) {
    var variables = line.split('=');
    object[variables[0]] = variables[1];
    return object;
  }, {});
};

module.exports.mapToArray = function(map) {
  return Object.keys(map).map(function(key) {
    return map[key];
  });
};

module.exports.injectTeamsToGames = function(teamMap, games) {
  return games.map(function(game) {
    game.team1 = [teamMap[game.team1].player1, teamMap[game.team1].player2];
    game.team2 = [teamMap[game.team2].player1, teamMap[game.team2].player2];
    return game;
  });
};

module.exports.scoreFoosers = function(fooserMap, injectedGames) {
  Object.keys(fooserMap).forEach(function(fooser) {
    fooserMap[fooser].wins = 0;
    fooserMap[fooser].losses = 0;
    fooserMap[fooser].total = 0;
    fooserMap[fooser].teamWins = 0;
    fooserMap[fooser].teamLosses = 0;
    fooserMap[fooser].teamTotal = 0;
  });
  injectedGames.forEach(function(game) {
    var team1Wins = game.team1WinsBlack + game.team1WinsYellow;
    var team2Wins = game.team2WinsBlack + game.team2WinsYellow;
    game.team1.forEach(function(name) {
      fooserMap[name] = addGameToFooser(fooserMap[name], team1Wins, team2Wins);
    });
    game.team2.forEach(function(name) {
      fooserMap[name] = addGameToFooser(fooserMap[name], team2Wins, team1Wins);
    });
  });
  return fooserMap;
};

module.exports.sortFoosers = function(scoredFoosers) {
  return Object.keys(scoredFoosers).map(function(fooser) {
    return scoredFoosers[fooser];
  }).filter(function(fooser) {
    return fooser.total !== 0;
  }).sort(function(fooser1, fooser2) {
    return fooser2.wins / fooser2.total - fooser1.wins / fooser1.total;
  });
};

function addGameToFooser(fooser, wins, losses) {
  fooser.wins += wins;
  fooser.losses += losses;
  fooser.total += wins + losses;
  fooser.teamWins += wins > losses ? 1 : 0;
  fooser.teamLosses += wins < losses ? 1 : 0;
  fooser.teamTotal++;
  return fooser;
}
