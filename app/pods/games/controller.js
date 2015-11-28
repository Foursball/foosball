import Ember from 'ember';

const { Controller, computed, get, set } = Ember;

export default Controller.extend({
  queryParams: ['expandedId'],

  sortedGames: computed('model.[]', function() {
    let games = get(this, 'model');

    return games.toArray().sort((a, b) => {
      a = new Date(get(a, 'time')).getTime();
      b = new Date(get(b, 'time')).getTime();

      return a > b ? -1 : a === b ? 0 : 1;
    });
  }),

  actions: {
    expandGame(game) {
      set(this, 'expandedId', game.id);
    }
  }
});
