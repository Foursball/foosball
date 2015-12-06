import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  model() {
    return this.store.findAll('team');
  },

  afterModel(teams) {
    return this.store.findAll('game');
  }
});
