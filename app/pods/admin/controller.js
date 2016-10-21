import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { Controller } = Ember;

export default Controller.extend({
  queryParams: ['section'],

  section: 'players',

  selectedLeague: null,

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end*/
  foosballers() {
    return this.store.peekAll('foosballer');
  },

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end*/
  leagues() {
    return this.store.peekAll('league');
  }
});
