import Ember from 'ember';

const { Controller, computed, get } = Ember;

export default Controller.extend({
  sortedGames: computed('model.[]', function() {
    let games = get(this, 'model');

    return games.sortBy('time');
  })
});
