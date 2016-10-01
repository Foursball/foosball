import Ember from 'ember';
import { BusPublisherMixin } from 'ember-message-bus';

const { Route, get, RSVP } = Ember;

export default Route.extend(BusPublisherMixin, {
  model() {
    return get(this, 'store').findAll('foosballer')
      .then((foosballers) => {
         this.publish('foosballersFound', foosballers);
         return foosballers;
      });
  },

  afterModel() {
    let promises = [
      this.store.findAll('game'),
      this.store.findAll('team')
    ];

    return RSVP.all(promises);
  }
});
