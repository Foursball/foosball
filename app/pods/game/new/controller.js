import Ember from 'ember';

const { Controller, computed, get } = Ember;

export default Controller.extend({
  players: computed('team1Player1', 'team1Player2', 'team2Player1', 'team2Player2', function() {
    let t1p1 = get(this, 'team1Player1.id');
    let t1p2 = get(this, 'team1Player2.id');
    let t2p1 = get(this, 'team2Player1.id');
    let t2p2 = get(this, 'team2Player2.id');

    return this.store
      .query('foosballer', {})
      .then((foosballers) => {
        return foosballers.filter((foosballer) => {
          let fId = get(foosballer, 'id');
          return fId !== t1p1 && fId !== t1p2 && fId !== t2p1 && fId !== t2p2;
        });
      });
  }),

  team1Player1: null,
  team1Player2: null,

  team2Player1: null,
  team2Player2: null,

  canStart: computed.and('team1Player1', 'team1Player2', 'team2Player1', 'team2Player2'),
  cannotStart: computed.not('canStart')
});
