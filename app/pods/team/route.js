import Ember from 'ember';

const { Route, set } = Ember;

export default Route.extend({
  afterModel(team) {
    let gamesController = this.controllerFor('games');

    return this.store.findAll('game').then((games) => set(gamesController, 'model', games));
  }
});
