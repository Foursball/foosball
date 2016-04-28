onmessage = function(event) {
  var message = JSON.parse(event.data);
  var games = message.games;
  var team1Id = message.team1Id;
  var team2Id = message.team2Id;

  var matchedGames = games.filter(function(g) {
    var t1 = g.team1;
    var t2 = g.team2;

    return (t1 === team1Id || t1 === team2Id) &&
      (t2 === team1Id || t2 === team2Id);
  });

  postMessage(JSON.stringify(matchedGames));
}
