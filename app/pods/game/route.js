import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  actions: {
    cancelGame(game) {
      let isNewGame = !get(game, 'time');

      if (isNewGame) {
        game
          .destroyRecord()
          .then(() => this.transitionTo('application'));
      } else {
        game.rollback();
        this.transitionTo('application');
      }
    }
  }
});
