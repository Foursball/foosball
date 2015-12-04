import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { Controller, get } = Ember;

export default Controller.extend({
  /* jshint ignore:start */
  @computed('model.[]')
  /* jshint ignore:end */
  wins(games) {
    let scoreSheet = { black: 0, yellow: 0 };

    return games.reduce((prev, g) => {
      prev.black += get(g, 'blackWins');
      prev.yellow += get(g, 'yellowWins');

      return prev;
    }, scoreSheet);
  }
});
