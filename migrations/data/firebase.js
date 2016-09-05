var request = require('request');
var Promise = require('bluebird');

module.exports = {
  getGames: getGames,
  setGames: setGames
};

function getGames(firebaseUrl) {
  return new Promise(function(resolve) {
    request(firebaseUrl + '/games.json', function(error, response, body) {
      resolve(JSON.parse(body));
    });
  });
}

function setGames(firebaseUrl, games) {
  return new Promise(function(resolve) {
    request({
      url: firebaseUrl + '/games.json',
      method: 'PUT',
      json: games
    }, function(error, response, body) {
      resolve(body);
    });
  });
}
