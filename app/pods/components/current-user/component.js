import Ember from 'ember';
import { BusSubscriberMixin } from 'ember-message-bus';
import computed from 'ember-computed-decorators';

const { Component, get, on, set, inject: { service } } = Ember;

export default Component.extend(BusSubscriberMixin, {
  session: service(),
  store: service(),

  tagName: '',

  // {DS.Foosballer}
  controllerCurrentPlayer: null,

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end*/
  teams() {
    return this.get('store').peekAll('team');
  },

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end */
  games() {
    return this.get('store').peekAll('game');
  },

  /* jshint ignore:start */
  @computed('session.currentUser', 'controllerCurrentPlayer')
  /* jshint ignore:end */
  currentPlayer(foosballers, controllerCurrentPlayer) {
    if (controllerCurrentPlayer) {
      return controllerCurrentPlayer;
    }

    return get(this, 'session.currentUser');
  },

  /* jshint ignore:start */
  @computed('teams', 'games', 'currentPlayer')
  /* jshint ignore:end */
  stats(teams, games, currentPlayer) {
    if (!currentPlayer) {
      return {
        playerGames: [],
        gamesWon: [],
        playerTeams: []
      };
    }

    let playerGames = games
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
    let gamesWon = playerGames
      .filter((g) => {
        let wP1 = get(g, 'winningTeam.player1.id');
        let wP2 = get(g, 'winningTeam.player2.id');

        return currentPlayer.id === wP1 ||
               currentPlayer.id === wP2;
      });
    let playerTeams = teams.filter((t) => {
      return currentPlayer.id === get(t, 'player1.id') || currentPlayer.id === get(t, 'player2.id');
    });

    return { playerGames, gamesWon, playerTeams };
  }
});
