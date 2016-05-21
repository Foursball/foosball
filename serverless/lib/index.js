var request = require('request');
var Q = require('q');

module.exports.getFoosers = function() {
  var deferred = Q.defer();
  request("https://dev-foosball.firebaseio.com/foosballers.json", function(error, response, body) {
    deferred.resolve(JSON.parse(body));
  });
  return deferred.promise;
};

module.exports.getGames = function() {
  var deferred = Q.defer();
  request("https://dev-foosball.firebaseio.com/games.json", function(error, response, body) {
    deferred.resolve(JSON.parse(body));
  });
  return deferred.promise;
};

module.exports.getTeams = function() {
  var deferred = Q.defer();
  request("https://dev-foosball.firebaseio.com/teams.json", function(error, response, body) {
    deferred.resolve(JSON.parse(body));
  });
  return deferred.promise;
};
