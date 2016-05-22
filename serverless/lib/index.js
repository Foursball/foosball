var request = require('request');
var Promise = require('bluebird');

module.exports.help = function() {
  return [
    "Foos - The Foursball Slack integration",
    "Usage: help - This help text",
    "       top [number of foosers] - The top ranked foosers (default: 5)"
  ].join('\n');
};

module.exports.parseFormData = function(data) {
  return data.split(', ').reduce(function(object, line) {
    var variables = line.split('=');
    object[variables[0]] = variables[1];
    return object;
  }, {});
};

module.exports.topFoosers = function(numberOfFoosers, currentUser) {
  return Promise.all([getFoosers(), getTeams(), getGames()]).then(function(data) {
      var fooserMap = data[0];
      var teamMap = data[1];
      var games = mapToArray(data[2]);

      var injectedGames = injectTeamsToGames(teamMap, games);
      var scoredFoosers = scoreFoosers(fooserMap, injectedGames);
      var currentFooser = mapToArray(scoredFoosers).filter(function(fooser) {
        return fooser.name.toLowerCase() === currentUser;
      });
      var sortedFoosers = sortFoosers(scoredFoosers);

      var topFoosers = sortedFoosers.slice(0, Math.min(numberOfFoosers, sortedFoosers.length));

      var textArray = topFoosers.map(function(fooser, i) {
        return (i + 1) + '. ' + fooser.name + ' - W: ' + (fooser.wins || 0) + ', L: ' + (fooser.losses || 0) + ', Win %: ' + Math.round(100 * fooser.wins / fooser.total) + '%';
      });
      if (currentFooser.length === 1) {
        textArray.push("and you are ranked number " + (sortedFoosers.indexOf(currentFooser[0]) + 1));
      }

      return {
        response_type: "in_channel",
        text: "The top " + topFoosers.length + " foosers are:",
        attachments: [{
          "text": textArray.join('\n')
        }]
      };
  });
};

function getFoosers() {
  return new Promise(function(resolve) {
    request("https://netuitivefoosball.firebaseio.com/foosballers.json", function(error, response, body) {
      resolve(JSON.parse(body));
    });
  });
}

function getGames() {
  return new Promise(function(resolve) {
    request("https://netuitivefoosball.firebaseio.com/games.json", function(error, response, body) {
      resolve(JSON.parse(body));
    });
  });
}

function getTeams() {
  return new Promise(function(resolve) {
    request("https://netuitivefoosball.firebaseio.com/teams.json", function(error, response, body) {
      resolve(JSON.parse(body));
    });
  });
}

function mapToArray(map) {
  return Object.keys(map).map(function(key) {
    return map[key];
  });
}

function injectTeamsToGames(teamMap, games) {
  return games.map(function(game) {
    game.team1 = [teamMap[game.team1].player1, teamMap[game.team1].player2];
    game.team2 = [teamMap[game.team2].player1, teamMap[game.team2].player2];
    return game;
  });
}

function scoreFoosers(fooserMap, injectedGames) {
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
}

function sortFoosers(scoredFoosers) {
  return Object.keys(scoredFoosers).map(function(fooser) {
    return scoredFoosers[fooser];
  }).filter(function(fooser) {
    return fooser.total !== 0;
  }).sort(function(fooser1, fooser2) {
    return fooser2.wins / fooser2.total - fooser1.wins / fooser1.total;
  });
}

function addGameToFooser(fooser, wins, losses) {
  fooser.wins += wins;
  fooser.losses += losses;
  fooser.total += wins + losses;
  fooser.teamWins += wins > losses ? 1 : 0;
  fooser.teamLosses += wins < losses ? 1 : 0;
  fooser.teamTotal++;
  return fooser;
}
