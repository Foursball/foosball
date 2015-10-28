import Ember from 'ember';
import moment from 'moment';

const { Controller, computed, get } = Ember;

export default Controller.extend({
  sortedGames: computed('model.[]', function() {
    let games = get(this, 'model');

    return games.toArray().sort((a, b) => {
      a = moment(get(a, 'time')).valueOf();
      b = moment(get(b, 'time')).valueOf();

      return a > b ? -1 : a === b ? 0 : 1;
    });
  }),

  wins: computed('model.[]', function() {
    let games = get(this, 'model');
    let scoreSheet = { black: 0, yellow: 0 };

    return games.reduce((prev, g) => {
      prev.black += get(g, 'team1WinsBlack') + get(g, 'team2WinsBlack');
      prev.yellow += get(g, 'team1WinsYellow') + get(g, 'team2WinsYellow');

      return prev;
    }, scoreSheet);
  })
});
