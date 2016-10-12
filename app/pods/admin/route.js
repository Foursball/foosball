import Ember from 'ember';
import { BusPublisherMixin } from 'ember-message-bus';

const {
  Route,
  RSVP: { all }
} = Ember;

export default Route.extend(BusPublisherMixin, {
  afterModel() {
    let promises = [
      this.store.findAll('foosballer')
        .then((foosballers) => this.publish('foosballersFound', foosballers))
    ];

    return all(promises);
  }
});
