import Ember from 'ember';
import { BusPublisherMixin } from 'ember-message-bus';

const { Route, get } = Ember;

export default Route.extend(BusPublisherMixin, {
  model() {
    return this.store.findAll('team');
  },

  afterModel(model, transition) {
    return this.store
      .findAll('foosballer')
      .then((foosballers) => this.publish('foosballersFound', foosballers))
      .then(() => this.store.findAll('game'));
  }
});
