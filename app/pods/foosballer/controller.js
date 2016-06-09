import Ember from 'ember';
import { equal, alias } from 'ember-computed-decorators';
import computed from 'ember-computed-decorators';
import FoosballersController from 'foosball/pods/foosballers/controller';

const { Controller, set, get } = Ember;

export default FoosballersController.extend({
  queryParams: ['sortAscending', 'sortBy', 'tab'],

  tab: 'games',

  @alias('model') currentPlayer,

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end*/
  foosballers() {
    const { store } = this;

    return store.peekAll('foosballer');
  },

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end*/
  teams() {
    const { store } = this;

    return store.peekAll('team');
  },

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end */
  legitGames() {
    const { store } = this;

    return store.peekAll('game');
  },

  /* jshint ignore:start */
  @computed('legitGames')
  /* jshint ignore:end */
  playerGames(legitGames) {
    let currentPlayer = get(this, 'currentPlayer');

    return legitGames
      .filter((g) => {
        let wP1 = get(g, 'winningTeam.player1.id');
        let wP2 = get(g, 'winningTeam.player2.id');
        let lP1 = get(g, 'losingTeam.player1.id');
        let lP2 = get(g, 'losingTeam.player2.id');

        return currentPlayer.id === wP1 ||
               currentPlayer.id === wP2 ||
               currentPlayer.id === lP1 ||
               currentPlayer.id === lP2;
      });
  },

  /* jshint ignore:start */
  @computed('playerGames')
  /* jshint ignore:end */
  gamesWon(playerGames) {
    let currentPlayer = get(this, 'currentPlayer');

    return playerGames
      .filter((g) => {
        let wP1 = get(g, 'winningTeam.player1.id');
        let wP2 = get(g, 'winningTeam.player2.id');

        return currentPlayer.id === wP1 ||
               currentPlayer.id === wP2;
      });
  },

  /* jshint ignore:start */
  @computed('legitGames')
  /* jshint ignore:end */
  sortedGames(legitGames) {
    return legitGames.toArray().sort((a, b) => {
      a = new Date(get(a, 'time')).getTime();
      b = new Date(get(b, 'time')).getTime();

      return a > b ? -1 : a === b ? 0 : 1;
    });
  },
});
