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

    return cb(null, {
      message: 'Go Serverless! Your Lambda function executed successfully!'
    });
  });
};
