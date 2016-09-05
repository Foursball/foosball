var firebase = require('./data/firebase');
var lib = require('./lib');

var functions = {
  removeColors: function(firebaseUrl) {
    if (!firebaseUrl) {
      console.log('Error: Firebase URL is required as a parameter');
    }
    return firebase.getGames(firebaseUrl)
      .then(lib.removeTeamColors)
      .then(function(migratedGames) {
        console.log(migratedGames);
      });
  }
};

var args = process.argv.slice(2);

if (args.length === 0) {
  console.log('A function name must be provided: ' + Object.keys(functions).join(', '));
} else {
  if (args[0] in functions) {
    var fn = functions[args[0]];
    fn.apply(this, args.slice(1));
  } else {
    console.log('"' + args[0] + '" is not a function');
  }
}
