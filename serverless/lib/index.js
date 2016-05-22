var request = require('request');
var Promise = require('bluebird');

module.exports.getFoosers = function() {
  return new Promise(function(resolve) {
    request("https://dev-foosball.firebaseio.com/foosballers.json", function(error, response, body) {
      resolve(JSON.parse(body));
    });
  });
};

module.exports.getGames = function() {
  return new Promise(function(resolve) {
    request("https://dev-foosball.firebaseio.com/games.json", function(error, response, body) {
      resolve(JSON.parse(body));
    });
  });
};

module.exports.getTeams = function() {
  return new Promise(function(resolve) {
    request("https://dev-foosball.firebaseio.com/teams.json", function(error, response, body) {
      resolve(JSON.parse(body));
    });
  });
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
  injectedGames.forEach(function(game) {
    var winningTeam = game.team1WinsBlack + game.team1WinsYellow === 2 ? 'team1' : 'team2';
    var losingTeam = winningTeam === 'team1' ? 'team2' : 'team1';
    game[winningTeam].forEach(function(name) {
      fooserMap[name] = addGameToFooser(fooserMap[name], "wins");
    });
    game[losingTeam].forEach(function(name) {
      fooserMap[name] = addGameToFooser(fooserMap[name], "loses");
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
    return fooser1.wins / fooser1.total < fooser2.wins / fooser2.total;
  });
};

function addGameToFooser(fooser, field) {
  if (fooser[field] === undefined) {
    fooser[field] = 0;
  }
  if (fooser.total === undefined) {
    fooser.total = 0;
  }
  fooser[field]++;
  fooser.total++;
  return fooser;
}
