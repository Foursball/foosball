import Ember from 'ember';
import computed, { not } from 'ember-computed-decorators';

const { Controller, get, inject, getProperties } = Ember;

export default Controller.extend({
  gamesService: inject.service('games'),

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end */
  games() {
    return get(this, 'store').peekAll('game');
  },

  /* jshint ignore:start */
  @computed('games.[]', 'model.team1', 'model.team2')
  /* jshint ignore:end */
  gamesAgainst(games, team1, team2) {
    return get(this, 'gamesService').gamesPlayedAgainst(games, team1, team2);
  },

  /* jshint ignore:start */
  @computed('gamesAgainst')
  /* jshint ignore:end */
  havePlayedBefore(gamesAgainst) {
    return get(gamesAgainst, 'length');
  },

  /* jshint ignore:start */
  @computed('gamesAgainst')
  /* jshint ignore:end */
  mostRecent(gamesAgainst) {
    let recentGame = get(this, 'gamesService').mostRecentGame(gamesAgainst);

    return getProperties(recentGame, 'time', 'winningTeam', 'winningTeamWins', 'losingTeamWins');
  },

  /* jshint ignore:start */
  @computed('model.team1', 'gamesAgainst')
  /* jshint ignore:end */
  team1Wins(team1, gamesAgainst) {
    return get(this, 'gamesService').winsForTeam(team1, gamesAgainst);
  },

  /* jshint ignore:start */
  @computed('model.team2', 'gamesAgainst')
  /* jshint ignore:end */
  team2Wins(team2, gamesAgainst) {
    return get(this, 'gamesService').winsForTeam(team2, gamesAgainst);
  },

  /* jshint ignore:start */
  @computed('model.isNotFullyCreated')
  /* jshint ignore:end */
  cancelOrDelete(isNotFullyCreated) {
    return isNotFullyCreated ? 'Delete' : 'Cancel';
  },

  /* jshint ignore:start */
  @computed('model.{team1WinsBlack,team1WinsYellow,team2WinsBlack,team2WinsYellow}')
  /* jshint ignore:end */
  canSave(t1wb, t1wy, t2wb, t2wy) {
    let game = get(this, 'model');
    t1wb = t1wb || 0;
    t1wy = t1wy || 0;
    t2wb = t2wb || 0;
    t2wy = t2wy || 0;
    let t1wins = t1wb + t1wy;
    let t2wins = t2wb + t2wy;
    let totalWins = t1wins + t2wins;

    if (t1wins > 2 || t2wins > 2) {
      return false;
    }

    return (totalWins === 2 || totalWins === 3) && (t1wins > 1 || t2wins > 1);
  },

  /* jshint ignore:start */
  @not('canSave') cannotSave
  /* jshint ignore:end */
});
