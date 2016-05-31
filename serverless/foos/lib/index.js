var request = require('request');
var Promise = require('bluebird');

var firebase = require('../../lib/data/firebase');
var responses = require('./responses');
var common = require('../../lib');
var util = require('../../lib/util');
var slack = require('../../lib/data/slack');

module.exports.topFoosers = function(numberOfFoosers, currentUserId) {
  return Promise.all([firebase.getFoosers(), firebase.getTeams(), firebase.getGames()]).then(function(data) {
      var fooserMap = data[0];
      var teamMap = data[1];
      var games = util.mapToArray(data[2]);

      var injectedGames = common.injectTeamsToGames(teamMap, games);
      var scoredFoosers = common.scoreFoosers(fooserMap, injectedGames);
      return slack.getRealName(currentUserId).then(function(realName) {
        var currentFooser = util.mapToArray(scoredFoosers).filter(function(fooser) {
          return fooser.name.toLowerCase() === realName.toLowerCase();
        });
        var sortedFoosers = common.sortFoosers(scoredFoosers);

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
      var games = util.mapToArray(data[2]);

      var injectedGames = common.injectTeamsToGames(teamMap, games);
      var scoredFoosers = common.scoreFoosers(fooserMap, injectedGames);
      var currentFooser = util.mapToArray(scoredFoosers).filter(function(fooser) {
        return fooser.name.toLowerCase() === fooserName.toLowerCase();
      });
      if (currentFooser.length === 0) {
        return {
          text: "The fooser " + fooserName + " does not appear to be a valid fooser"
        };
      }
      var sortedFoosers = common.sortFoosers(scoredFoosers);
      var topFoosers = sortedFoosers.slice(0, Math.min(numberOfFoosers, sortedFoosers.length));
      var response = topFoosers.indexOf(currentFooser[0]) === -1 ? responses.notTopFooserResponse() : responses.topFooserResponse();
      return {
        response_type: "in_channel",
        text: response
      };
  });
};
