import Ember from 'ember';

const { Route, get, RSVP } = Ember;

export default Route.extend({
  model() {
    return get(this, 'store').findAll('foosballer');
  },

  afterModel() {
    const { store } = this;

    let gamesPromise = store.findAll('game');
    let teamsPromise = store.findAll('team');

    return RSVP.all([gamesPromise, teamsPromise]);
  }
});
