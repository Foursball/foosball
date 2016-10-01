import Ember from 'ember';
import { BusPublisherMixin } from 'ember-message-bus';

const { Route, RSVP } = Ember;

export default Route.extend(BusPublisherMixin, {
  afterModel(teams) {
    let promises = [
      this.store.findAll('team'),
      this.store.findAll('game'),
      this.store.findAll('foosballer')
        .then((foosballers) => {
          this.publish('foosballersFound', foosballers);
          return foosballers;
        })
    ];

    return RSVP.all(promises);
  }
});
