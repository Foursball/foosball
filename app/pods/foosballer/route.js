import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  afterModel(teams) {
    let promises = [
      this.store.findAll('team'),
      this.store.findAll('game'),
      this.store.findAll('foosballer')
    ];

    return RSVP.all(promises);
  }
});
