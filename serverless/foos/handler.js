'use strict';

var Promise = require('bluebird');
var lib = require('../lib');

module.exports.handler = function(event, context, cb) {
  return Promise.all([lib.getFoosers(), lib.getTeams(), lib.getGames()]).then(function(data) {
    var params = lib.parseFormData(event.queryParams);

    var fooserMap = data[0];
    var teamMap = data[1];
    var games = lib.mapToArray(data[2]);

    var injectedGames = lib.injectTeamsToGames(teamMap, games);
    var scoredFoosers = lib.scoreFoosers(fooserMap, injectedGames);
    var sortedFoosers = lib.sortFoosers(scoredFoosers);

    var count = parseInt(params.text.split(' ')[0]) || 5;

    var topFoosers = sortedFoosers.slice(0, Math.min(count, sortedFoosers.length));

    return cb(null, {
      response_type: "in_channel",
      text: "The top " + topFoosers.length + " foosers are:",
      attachments: [{
        "text": topFoosers.map(function(fooser, i) {
          return (i + 1) + '. ' + fooser.name + ' - W: ' + (fooser.wins || 0) + ', L: ' + (fooser.losses || 0) + ', Win %: ' + Math.round(100 * fooser.wins / fooser.total) + '%';
        }).join('\n')
      }]
    });
  });
};
