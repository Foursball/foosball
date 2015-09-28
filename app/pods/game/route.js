import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  actions: {
    cancelGame(game) {
      if (get(game, 'isNotFullyCreated')) {
        game
          .destroyRecord()
          .then(() => this.transitionTo('application'));
      } else {
        game.rollback();
        this.transitionTo('application');
      }
    },

    editGame(game) {
      this.transitionTo('game.edit', game);
    }
  }
});
