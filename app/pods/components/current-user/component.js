import Ember from 'ember';
import { BusSubscriberMixin } from 'ember-message-bus';
import computed from 'ember-computed-decorators';

const { Component, get, on, set, inject: { service } } = Ember;

export default Component.extend(BusSubscriberMixin, {
  session: service(),

  foosballers: [],

  updateFoosballers: on('foosballersFound', function(foosballers) {
    set(this, 'foosballers', foosballers);
  }),

  /* jshint ignore:start */
  @computed('foosballers.[]')
  /* jshint ignore:end */
  currentPlayer(foosballers) {
    let session = get(this, 'session');

    return foosballers.findBy('uid', get(session, 'uid'));
  }
});
