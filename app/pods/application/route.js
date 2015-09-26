import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  actions: {
    transitionTo(route) {
      this.transitionTo(route);
    },

    goToGame(game) {
      this.transitionTo('game', game);
    }
  }
});
