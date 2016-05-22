'use strict';

var lib = require('../lib');

var filteredOutWords = ['i', 'in', 'the', 'top', 'any', 'more', 'anymore', 'foosers'];

module.exports.handler = function(event, context, cb) {
  var params = lib.parseFormData(event.queryParams);
  var textArray = params.text.split('?').join('').split(' ');
  if (textArray.length === 0) {
    cb(null, {
      text: lib.help()
    });
  }

  var command = textArray.shift();
  var filteredTextArray, count;
  switch(command.toLowerCase()) {
    case 'top':
      lib.topFoosers(parseInt(textArray[0]) || 5, params.user_id).then(function(response) {
        cb(null, response);
      });
      break;
    case 'is':
      filteredTextArray = textArray.filter(function(word) {
        return filteredOutWords.indexOf(word.toLowerCase()) === -1;
      });
      count = filteredTextArray.pop();
      lib.inTopFoosers(filteredTextArray.join(' '), count).then(function(response) {
        cb(null, response);
      });
      break;
    case 'am':
      filteredTextArray = textArray.filter(function(word) {
        return filteredOutWords.indexOf(word.toLowerCase()) === -1;
      });
      count = filteredTextArray.pop();
      lib.getRealName(params.user_id).then(function(realName) {
        lib.inTopFoosers(realName, count).then(function(response) {
          cb(null, response);
        });
      });
      break;
    default:
      cb(null, {
        text: lib.help()
      });
  }
};
