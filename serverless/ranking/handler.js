'use strict';

var Q = require('q');
var lib = require('../lib');

module.exports.handler = function(event, context, cb) {
  return Q.all([lib.getFoosers(), lib.getTeams(), lib.getGames()]).then(function(data) {
    var fooserMap = data[0];
    var teamMap = data[1];
    var games = lib.mapToArray(data[2]);

    var injectedGames = lib.injectTeamsToGames(teamMap, games);
    var scoredFoosers = lib.scoreFoosers(fooserMap, injectedGames);
    var sortedFoosers = lib.sortFoosers(scoredFoosers);

    var count = parseInt(event.text.split(' ')[0]) || 5;

    var topFoosers = sortedFoosers.slice(0, Math.min(count, sortedFoosers.length) - 1);

    return cb(null, {
      text: "The top " + topFoosers.length + " foosers are:",
      attachments: [{
        "text": topFoosers.map(function(fooser, i) {
          return (i + 1) + '. ' + fooser.name + ' - Wins: ' + (fooser.wins || 0) + ', Losses: ' + (fooser.losses || 0) + ', Win Percentage: ' + Math.round(100 * fooser.wins / fooser.total) + '%';
        }).join('\n')
      }]
    });
  });
};
