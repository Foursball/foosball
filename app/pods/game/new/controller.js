import Ember from 'ember';
import computed, { and, not } from 'ember-computed-decorators';

const { Controller, get, set } = Ember;

export default Controller.extend({
  /* jshint ignore:start */
  @computed
  /* jshint ignore:end */
  foosballers() {
    const { store } = this;

    return store.findAll('foosballer');
  },

  /* jshint ignore:start */
  @computed('team1Player1.id', 'team1Player2.id', 'team2Player1.id', 'team2Player2.id', 'foosballers.[]')
  /* jshint ignore:end */
  players(t1p1, t1p2, t2p1, t2p2, foosballers) {
    return foosballers.filter((foosballer) => {
      let fId = foosballer.id;
      return fId !== t1p1 && fId !== t1p2 && fId !== t2p1 && fId !== t2p2;
    })
    .sort((a, b) => get(a, 'name') < get(b, 'name') ? -1 : 1);
  },

  team1Player1: null,
  team1Player2: null,

  team2Player1: null,
  team2Player2: null,

  /* jshint ignore:start */
  @and('team1Player1', 'team1Player2', 'team2Player1', 'team2Player2') canStart,
  @not('canStart') cannotStart,
  /* jshint ignore:end */

  actions: {
    team1Player1(player) {
      set(this, 'team1Player1', player);
    },

    team1Player2(player) {
      set(this, 'team1Player2', player);
    },

    team2Player1(player) {
      set(this, 'team2Player1', player);
    },

    team2Player2(player) {
      set(this, 'team2Player2', player);
    }
  }
});
