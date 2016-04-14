import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  model(params) {
    const { store } = this;
    let id = params.game_id; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers

    return store.findRecord('game', id)
      .catch((e) => {
        return store.createRecord('game', { id });
      });
  },

  actions: {
    error(error, transition) {
      const { store } = this;

      if (get(transition, 'targetName') === 'game.new') {
        // tried to refresh on a new game page but that game didn't exist in firebase yet
        let game = store.createRecord('game');

        this.transitionTo('game.new', game);
      } else {
        // tried to go to a different part of the game and that game doesn't exist
        // let the application route handle it
        return true;
      }
    },
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
