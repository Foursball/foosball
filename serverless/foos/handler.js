'use strict';

var foos = require('./lib');
var lib = require('../lib');
var util = require('../lib/util');
var slack = require('../lib/data/slack');
var responses = require('./lib/responses');

var filteredOutWords = ['i', 'a', 'in', 'the', 'top', 'any', 'more', 'anymore', 'foosers', 'fooser'];

module.exports.handler = function(event, context, cb) {
  var params = util.parseFormData(event.queryParams);
  var textArray = params.text.split('?').join('').split(' ');
  if (textArray.length === 0) {
    cb(null, {
      text: responses.help()
    });
  }

  var command = textArray.shift();
  var filteredTextArray, count;
  switch(command.toLowerCase()) {
    case 'top':
      foos.topFoosers(parseInt(textArray[0]) || 5, params.user_id).then(function(response) {
        cb(null, response);
      });
      break;
    case 'is':
      filteredTextArray = textArray.filter(function(word) {
        return filteredOutWords.indexOf(word.toLowerCase()) === -1;
      });
      count = filteredTextArray.pop();
      foos.inTopFoosers(filteredTextArray.join(' '), count).then(function(response) {
        cb(null, response);
      });
      break;
    case 'am':
      filteredTextArray = textArray.filter(function(word) {
        return filteredOutWords.indexOf(word.toLowerCase()) === -1;
      });
      count = filteredTextArray.pop();
      slack.getRealName(params.user_id).then(function(realName) {
        foos.inTopFoosers(realName, count).then(function(response) {
          cb(null, response);
        });
      });
      break;
    default:
      cb(null, {
        text: responses.help()
      });
  }
};
