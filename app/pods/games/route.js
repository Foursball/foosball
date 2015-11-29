import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    const { store } = this;

    return store.query('game', {});
  }
});
