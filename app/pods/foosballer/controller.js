import Ember from 'ember';
import { equal, alias } from 'ember-computed-decorators';
import computed from 'ember-computed-decorators';
import FoosballersController from 'foosball/pods/foosballers/controller';

const { Controller, set, get } = Ember;

export default FoosballersController.extend({
  queryParams: ['sortAscending', 'sortBy', 'tab'],

  tab: 'games',

  shouldFlex: true,

  /* jshint ignore:start */
  @alias('model') currentPlayer,
  /* jshint ignore:end */

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end*/
  foosballers() {
    return this.store.peekAll('foosballer');
  },

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end*/
  teams() {
    return this.store.peekAll('team');
  },

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end */
  games() {
    return this.store.peekAll('game');
  },

  /* jshint ignore:start */
  @computed('games.[]', 'currentPlayer')
  /* jshint ignore:end */
  playerGames(games, currentPlayer) {
    return games
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
  @computed('games.[]')
  /* jshint ignore:end */
  sortedGames(games) {
    return games.toArray().sort((a, b) => {
      a = new Date(get(a, 'time')).getTime();
      b = new Date(get(b, 'time')).getTime();

      return a > b ? -1 : a === b ? 0 : 1;
    });
  }
});
