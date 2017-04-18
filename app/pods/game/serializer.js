import ApplicationSerializer from 'foosball/pods/application/serializer';

export default ApplicationSerializer.extend({
  //TODO: model the teamGame
  normalize(model, hash, prop) {
    let createdAtDate = new Date(hash.dateCreated);

    if (hash.teamGames) {
      let teamOne = hash.teamGames[0];
      let teamTwo = hash.teamGames[1];

      hash.team1 = teamOne.team;
      hash.team1Wins = teamOne.wins;
      hash.team2 = teamTwo.team;
      hash.team2Wins = teamTwo.wins;
      hash.time = hash.dateCreated;
    }

    hash.timestamp = createdAtDate.valueOf();

    return this._super(...arguments);
  },

  serialize(snapshot, options) {
    let json = this._super(...arguments);

    json.teamGames = [{
        team: json.team1,
        wins: json.team1Wins
      }, {
        team: json.team2,
        wins: json.team2Wins
      }];

    delete json.team1;
    delete json.team1Wins;
    delete json.team2;
    delete json.team2Wins;

    return json;
  }
});
