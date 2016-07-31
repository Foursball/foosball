import Ember from 'ember';

const { Route, get, RSVP } = Ember;

export default Route.extend({
  model() {
    return get(this, 'store').findAll('foosballer');
  },

  afterModel() {
    let gamesPromise = this.store.findAll('game');
    let teamsPromise = this.store.findAll('team');

    return RSVP.all([gamesPromise, teamsPromise]);
  }
});
