'use strict';

var Q = require('q');
var lib = require('../lib');

module.exports.handler = function(event, context, cb) {
  return Q.all([lib.getFoosers(), lib.getTeams(), lib.getGames()]).then(function(data) {
    var foosers = data[0];
    var teams = data[1];
    var games = data[2];

    return cb(null, {
      message: 'Go Serverless! Your Lambda function executed successfully!'
    });
  });
};
