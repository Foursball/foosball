'use strict';

var lib = require('../lib');

module.exports.handler = function(event, context, cb) {
  var params = lib.parseFormData(event.queryParams);
  var textArray = params.text.split(' ');
  if (textArray.length === 0) {
    cb(null, {
      text: lib.help()
    });
  }

  var command = textArray.shift();
  lib.topFoosers(parseInt(textArray[0]) || 5).then(function(response) {
    cb(null, response);
  });
};
