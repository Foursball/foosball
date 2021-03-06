import Ember from 'ember';
import computed from 'ember-computed-decorators';

const {
  Controller,
  get,
  set,
  RSVP: {
    Promise
  },
  inject: { service }
} = Ember;

export default Controller.extend({
  addGame: false,

  media: service(),

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end*/
  foosballers() {
    return this.store.peekAll('foosballer');
  },

  /* jshint ignore:start */
  @computed('model.@each.time')
  /* jshint ignore:end */
  legitGames(games) {
    return games.filter((g) => get(g, 'time'));
  },

  /* jshint ignore:start */
  @computed('legitGames')
  /* jshint ignore:end */
  sortedGames(legitGames) {
    return legitGames.toArray().sort((a, b) => {
      a = new Date(get(a, 'time')).getTime();
      b = new Date(get(b, 'time')).getTime();

      return a > b ? -1 : a === b ? 0 : 1;
    });
  },

  actions: {
    expandGame(game) {
      set(this, 'expandedId', game.id);
    },

    addGame() {
      this.toggleProperty('addGame');
    }
  }
});
