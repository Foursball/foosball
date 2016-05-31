var request = require('request');
var Promise = require('bluebird');
var config = require('../../config');

module.exports.getRealName = function(userId) {
  return new Promise(function(resolve) {
    request('https://slack.com/api/users.info?token=' + config.slack_token + '&user=' + userId, function(error, response, body) {
      resolve(JSON.parse(body).user.profile.real_name);
    });
  });
};
