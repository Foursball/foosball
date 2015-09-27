import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  players: computed(function() {
    return this.store.findAll('foosballer');
  }),

  team1Player1: null,
  team1Player2: null,

  team2Player1: null,
  team2Player2: null,

  canStart: computed.and('team1Player1', 'team1Player2', 'team2Player1', 'team2Player2'),
  cannotStart: computed.not('canStart')
});
