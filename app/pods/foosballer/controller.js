import Ember from 'ember';
import { equal } from 'ember-computed-decorators';
import computed from 'ember-computed-decorators';
import FoosballersController from 'foosball/pods/foosballers/controller';

const { Controller, set, get } = Ember;

export default FoosballersController.extend({
  queryParams: ['sortAscending', 'sortBy', 'tab'],

  tab: 'games',

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end*/
  foosballers() {
    const { store } = this;

    return store.peekAll('foosballer');
  },

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end*/
  teams() {
    const { store } = this;

    return store.peekAll('team');
  },
});
