import Ember from 'ember';

const { Controller, computed, get } = Ember;

export default Controller.extend({
  cancelOrDelete: computed('model.isNotFullyCreated', function() {
    return get(this, 'model.isNotFullyCreated') ? 'Delete' : 'Cancel';
  }),

  canSave: computed('model.{team1WinsBlack,team1WinsYellow,team2WinsBlack,team2WinsYellow}', function() {
    let game = get(this, 'model');
    let t1wb = get(game, 'team1WinsBlack') || 0;
    let t1wy = get(game, 'team1WinsYellow') || 0;
    let t2wb = get(game, 'team2WinsBlack') || 0;
    let t2wy = get(game, 'team2WinsYellow') || 0;
    let t1wins = t1wb + t1wy;
    let t2wins = t2wb + t2wy;
    let totalWins = t1wins + t2wins;

    if (t1wins > 2 || t2wins > 2) {
      return false;
    }

    return totalWins === 2 || totalWins === 3;
  }),

  cannotSave: computed.not('canSave')
});
