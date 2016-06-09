import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  afterModel(teams) {
    let promises = [
      this.store.findAll('team'),
      this.store.findAll('game')
    ];

    return RSVP.all(promises);
  }
});
