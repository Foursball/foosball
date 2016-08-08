import FirebaseSerializer from 'emberfire/serializers/firebase';

export default FirebaseSerializer.extend({
  normalize(model, hash, prop) {
    if (!hash.team1Wins) {
      hash.team1Wins = hash.team1WinsBlack + hash.team1WinsYellow;
    }

    if (!hash.team2Wins) {
      hash.team2Wins = hash.team2WinsBlack + hash.team2WinsYellow;
    }

    return this._super(...arguments);
  }
});
