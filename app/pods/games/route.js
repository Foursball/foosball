import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  model() {
    const { store } = this;

    return store
      .query('game', {})
      .then(() => {
        return store.filter('game', (g) => get(g, 'time'));
      });
  }
});
