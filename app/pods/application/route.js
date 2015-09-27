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

    newGame() {
      let game = this.store.createRecord('game');

      game
        .save()
        .then((game) => this.transitionTo('game.new', game));
    }
  }
});
