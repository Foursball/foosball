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
  })
});
