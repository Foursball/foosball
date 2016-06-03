import Ember from 'ember';
import { equal } from 'ember-computed-decorators';
import computed from 'ember-computed-decorators';

const { Controller, set, get } = Ember;

export default Controller.extend({
  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end*/
  foosballers() {
    const { store } = this;

    return store.peekAll('foosballer');
  }
});
