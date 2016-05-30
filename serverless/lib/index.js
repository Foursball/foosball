var request = require('request');
var Promise = require('bluebird');
var config = require('../config');
var firebase = require('./data/firebase');

var topFooserResponses = [
  'Most definitely',
  'You betcha',
  'For sure',
  'Of course',
  'Obviously',
  'yas queen',
  'YEEEEEEAAAAAAAAH',
  'Yeyah',
  'Fo sho',
  'Yas. Werk.',
  'Da.'
];

var notTopFooserResponses = [
  'Not even close',
  'Nope',
  'Really?',
  'Definitely not',
  'Not this time',
  'Sucks to suck, playa.',
  'Nah, brah.',
  'No. Awkwaaaaard...',
  'Oh honey.'
];

module.exports.help = function() {
  return [
    'Foos - The Foursball Slack integration',
    '       help - This help text',
    '       top [number] - List the top ranked foosers (default: 5)',
    '       am I in the top [number] foosers?',
    '       is [fooser] in the top [number]?'
  ].join('\n');
};

module.exports.parseFormData = function(data) {
  return data.split(', ').reduce(function(object, line) {
    var variables = line.split('=');
    object[variables[0]] = variables[1];
    return object;
  }, {});
};

module.exports.topFoosers = function(numberOfFoosers, currentUserId) {
  return Promise.all([firebase.getFoosers(), firebase.getTeams(), firebase.getGames()]).then(function(data) {
      var fooserMap = data[0];
      var teamMap = data[1];
      var games = mapToArray(data[2]);

      var injectedGames = injectTeamsToGames(teamMap, games);
      var scoredFoosers = scoreFoosers(fooserMap, injectedGames);
      return module.exports.getRealName(currentUserId).then(function(realName) {
        var currentFooser = mapToArray(scoredFoosers).filter(function(fooser) {
          return fooser.name.toLowerCase() === realName.toLowerCase();
        });
        var sortedFoosers = sortFoosers(scoredFoosers);

        var topFoosers = sortedFoosers.slice(0, Math.min(numberOfFoosers, sortedFoosers.length));

        var textArray = topFoosers.map(function(fooser, i) {
          return (i + 1) + '. ' + fooser.name + ' - W: ' + (fooser.wins || 0) + ', L: ' + (fooser.losses || 0) + ', Win %: ' + Math.round(100 * fooser.wins / fooser.total) + '%';
        });
        if (currentFooser.length === 1 && topFoosers.indexOf(currentFooser[0]) === -1) {
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
  });
};

module.exports.inTopFoosers = function(fooserName, numberOfFoosers) {
  return Promise.all([firebase.getFoosers(), firebase.getTeams(), firebase.getGames()]).then(function(data) {
      var fooserMap = data[0];
      var teamMap = data[1];
      var games = mapToArray(data[2]);

      var injectedGames = injectTeamsToGames(teamMap, games);
      var scoredFoosers = scoreFoosers(fooserMap, injectedGames);
      var currentFooser = mapToArray(scoredFoosers).filter(function(fooser) {
        return fooser.name.toLowerCase() === fooserName.toLowerCase();
      });
      if (currentFooser.length === 0) {
        return {
          text: "The fooser " + fooserName + " does not appear to be a valid fooser"
        };
      }
      var sortedFoosers = sortFoosers(scoredFoosers);
      var topFoosers = sortedFoosers.slice(0, Math.min(numberOfFoosers, sortedFoosers.length));
      var response = topFoosers.indexOf(currentFooser[0]) === -1 ? notTopFooserResponse() : topFooserResponse();
      return {
        response_type: "in_channel",
        text: response
      };
  });
};

module.exports.getRealName = function(userId) {
  return new Promise(function(resolve) {
    request('https://slack.com/api/users.info?token=' + config.slack_token + '&user=' + userId, function(error, response, body) {
      resolve(JSON.parse(body).user.profile.real_name);
    });
  });
};

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

function notTopFooserResponse() {
  return notTopFooserResponses[Math.floor(Math.random() * notTopFooserResponses.length)];
}

function topFooserResponse() {
  return topFooserResponses[Math.floor(Math.random() * topFooserResponses.length)];
}
