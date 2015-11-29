import Ember from 'ember';

const { Controller, computed, get, set } = Ember;

export default Controller.extend({
  queryParams: ['expandedId'],

  legitGames: computed('model.[]', function() {
    return get(this, 'model').filter((g) => get(g, 'time'));
  }),

  sortedGames: computed('legitGames', function() {
    let legitGames = get(this, 'legitGames');

    return legitGames.toArray().sort((a, b) => {
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
