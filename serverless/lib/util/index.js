module.exports.parseFormData = function(data) {
  return data.split(', ').reduce(function(object, line) {
    var variables = line.split('=');
    object[variables[0]] = variables[1];
    return object;
  }, {});
};

module.exports.mapToArray = function(map) {
  return Object.keys(map).map(function(key) {
    return map[key];
  });
};
