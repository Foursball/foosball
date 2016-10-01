import Ember from 'ember';

const { Route, get, set, inject: { service } } = Ember;

export default Route.extend({
  transitionService: service('transition'),

  beforeModel(transition) {
    let transitionService = get(this, 'transitionService');

    set(transitionService, 'transition', transition);
  },

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
