import FirebaseSerializer from 'emberfire/serializers/firebase';
import Ember from 'ember';

const { isPresent } = Ember;

export default FirebaseSerializer.extend({
  normalize(model, hash, prop) {
    if (!isPresent(hash.team1Wins)) {
      hash.team1Wins = hash.team1WinsBlack + hash.team1WinsYellow;
    }

    if (!isPresent(hash.team2Wins)) {
      hash.team2Wins = hash.team2WinsBlack + hash.team2WinsYellow;
    }

    return this._super(...arguments);
  }
});
