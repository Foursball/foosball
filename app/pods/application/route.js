import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  actions: {
    transitionTo(route) {
      this.transitionTo(route);
    },

    goToGame(game) {
      this.transitionTo('game', game);
    },

    goToTeam(team) {
      this.transitionTo('team', team);
    },

    goToFoosballer(foosballer) {
      this.transitionTo('foosballer', foosballer);
    },

    newGame() {
      let game = this.store.createRecord('game');

      this.transitionTo('game.new', game);
    },

    error(error, transition) {
      this.transitionTo('something-happened');
    }
  }
});
