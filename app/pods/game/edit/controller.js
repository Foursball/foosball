import Ember from 'ember';
import computed, { not } from 'ember-computed-decorators';

const { Controller, get, getProperties } = Ember;

export default Controller.extend({
  /* jshint ignore:start */
  @computed('model.isNotFullyCreated')
  /* jshint ignore:end */
  cancelOrDelete(isNotFullyCreated) {
    return isNotFullyCreated ? 'Delete' : 'Cancel';
  },

  /* jshint ignore:start */
  @computed('model.{team1WinsBlack,team1WinsYellow,team2WinsBlack,team2WinsYellow}')
  /* jshint ignore:end */
  canSave(t1wb, t1wy, t2wb, t2wy) {
    let game = get(this, 'model');
    t1wb = t1wb || 0;
    t1wy = t1wy || 0;
    t2wb = t2wb || 0;
    t2wy = t2wy || 0;
    let t1wins = t1wb + t1wy;
    let t2wins = t2wb + t2wy;
    let totalWins = t1wins + t2wins;

    if (t1wins > 2 || t2wins > 2) {
      return false;
    }

    return (totalWins === 2 || totalWins === 3) && (t1wins > 1 || t2wins > 1);
  },

  /* jshint ignore:start */
  @not('canSave') cannotSave
  /* jshint ignore:end */
});
