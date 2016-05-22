'use strict';

var lib = require('../lib');

module.exports.handler = function(event, context, cb) {
  var params = lib.parseFormData(event.queryParams);
  var textArray = params.text.toLowerCase().split(' ');
  if (textArray.length === 0) {
    cb(null, {
      text: lib.help()
    });
  }

  var command = textArray.shift();
  switch(command) {
    case 'top':
      lib.topFoosers(parseInt(textArray[0]) || 5, params.user_name).then(function(response) {
        cb(null, response);
      });
      break;
    default:
      cb(null, {
        text: lib.help()
      });
  }
};
