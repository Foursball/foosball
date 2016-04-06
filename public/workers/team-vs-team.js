onmessage = function(event) {
  var games = JSON.parse(event.data);
  console.log(`received ${games.length}!`);

  setTimeout(function() {
    postMessage('Hai!');
  }, 2000);
}
