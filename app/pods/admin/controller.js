import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { Controller } = Ember;

export default Controller.extend({
  queryParams: ['section'],

  section: 'players',

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end*/
  foosballers() {
    return this.store.peekAll('foosballer');
  }
});
