import Ember from 'ember';

const { Controller, computed, get, set } = Ember;

export default Controller.extend({
  foosballers: computed(function() {
    const { store } = this;

    return store.findAll('foosballer');
  }),

  players: computed('team1Player1', 'team1Player2', 'team2Player1', 'team2Player2', 'foosballers.[]', function() {
    let foosballers = get(this, 'foosballers');
    let t1p1 = get(this, 'team1Player1.id');
    let t1p2 = get(this, 'team1Player2.id');
    let t2p1 = get(this, 'team2Player1.id');
    let t2p2 = get(this, 'team2Player2.id');

    return foosballers.filter((foosballer) => {
      let fId = foosballer.id;
      return fId !== t1p1 && fId !== t1p2 && fId !== t2p1 && fId !== t2p2;
    })
    .sort((a, b) => get(a, 'name') < get(b, 'name') ? -1 : 1);
  }),

  team1Player1: null,
  team1Player2: null,

  team2Player1: null,
  team2Player2: null,

  canStart: computed.and('team1Player1', 'team1Player2', 'team2Player1', 'team2Player2'),
  cannotStart: computed.not('canStart'),

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
