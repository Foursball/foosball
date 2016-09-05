var request = require('request');
var Promise = require('bluebird');

module.exports = {
  getGames: getGames
};

function getGames(firebaseUrl) {
  return new Promise(function(resolve) {
    request(firebaseUrl + '/games.json', function(error, response, body) {
      resolve(JSON.parse(body));
    });
  });
}
