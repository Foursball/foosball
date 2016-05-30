var request = require('request');
var Promise = require('bluebird');
var config = require('../../config');

module.exports = {
  getFoosers: getFoosers,
  getGames: getGames,
  getTeams: getTeams
};

function getFoosers() {
  return new Promise(function(resolve) {
    request(config.firebase + '/foosballers.json', function(error, response, body) {
      resolve(JSON.parse(body));
    });
  });
}

function getGames() {
  return new Promise(function(resolve) {
    request(config.firebase + '/games.json', function(error, response, body) {
      resolve(JSON.parse(body));
    });
  });
}

function getTeams() {
  return new Promise(function(resolve) {
    request(config.firebase + '/teams.json', function(error, response, body) {
      resolve(JSON.parse(body));
    });
  });
}
