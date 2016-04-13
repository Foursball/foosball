import Ember from 'ember';
import computed, { and, not } from 'ember-computed-decorators';

const {
  Controller,
  get,
  set,
  inject: { service },
  RSVP,
  getProperties
} = Ember;

export default Controller.extend({
  gamesService: service('games'),
  teamService: service('team-decorator'),

  /* jshint ignore:start */
  @computed
  /* jshint ignore:end */
  foosballers() {
    const { store } = this;

    return store.peekAll('foosballer');
  },

  /* jshint ignore:start */
  @computed
  /* jshint ignore:end */
  teams() {
    const { store } = this;

    return store.peekAll('team');
  },

  /* jshint ignore:start */
  @computed
  /* jshint ignore:end */
  games() {
    const { store } = this;

    return store.peekAll('game');
  },

  /* jshint ignore:start */
  @computed('team1Player1.id', 'team1Player2.id', 'team2Player1.id', 'team2Player2.id', 'foosballers.[]')
  /* jshint ignore:end */
  players(t1p1, t1p2, t2p1, t2p2, foosballers) {
    return foosballers.filter((foosballer) => {
      let fId = foosballer.id;
      return fId !== t1p1 && fId !== t1p2 && fId !== t2p1 && fId !== t2p2;
    })
    .sort((a, b) => get(a, 'name') < get(b, 'name') ? -1 : 1);
  },

  team1Player1: null,
  team1Player2: null,

  team2Player1: null,
  team2Player2: null,

  /* jshint ignore:start */
  @and('team1Player1', 'team1Player2', 'team2Player1', 'team2Player2') canStart,
  @not('canStart') cannotStart,
  /* jshint ignore:end */

  /* jshint ignore:start */
  @computed('games.[]', 'teams.[]', 'team1Player1.id', 'team1Player2.id', 'team2Player1.id', 'team2Player2.id')
  /* jshint ignore:end */
  gamesAgainst(games, teams, t1p1, t1p2, t2p1, t2p2) {
    let teamService = get(this, 'teamService');

    if (!t1p1 || !t1p2 || !t2p1 || !t2p2) {
      return RSVP.resolve();
    } else {
      let team1 = teamService.getTeam(teams, t1p1, t1p2);
      let team2 = teamService.getTeam(teams, t2p1, t2p2);

      return get(this, 'gamesService').gamesPlayedAgainstAsync(games, team1, team2);
    }
  },

  mostRecent: Ember.computed('gamesAgainst.isFulfilled', 'games.[]', function() {
    let gamesAgainst = get(this, 'gamesAgainst');

    if (get(gamesAgainst, 'isFulfilled')) {
      let games = get(this, 'games');
      let recentGame = get(this, 'gamesService').mostRecentGame(get(gamesAgainst, 'content'));
      let recentStoreGame = games.findBy('id', recentGame.id);

      return getProperties(recentStoreGame, 'time', 'winningTeam', 'winningTeamWins', 'losingTeamWins');
    } else {
      console.log('not fulfilled');
      return {};
    }
  }),


  /*@public Function used by ember-select to get the display value */
  retrievePlayerName(player) {
    return get(player, 'name');
  }
});
