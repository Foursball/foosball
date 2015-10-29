import Ember from 'ember';

const { Controller, computed, get } = Ember;

export default Controller.extend({
  wins: computed('model.[]', function() {
    let games = get(this, 'model');
    let scoreSheet = { black: 0, yellow: 0 };

    return games.reduce((prev, g) => {
      prev.black += get(g, 'blackWins');
      prev.yellow += get(g, 'yellowWins');

      return prev;
    }, scoreSheet);
  })
});
