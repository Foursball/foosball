import Ember from 'ember';
import computed, { and, not } from 'ember-computed-decorators';
import ENV from 'foosball/config/environment';
import moment from 'moment';

const {
  Component,
  get,
  set,
  setProperties,
  inject: { service },
  RSVP,
  $,
  getProperties
} = Ember;

export default Component.extend({
  gamesService: service('games'),
  teamService: service('team-decorator'),
  notify: service(),
  store: service(),

  isScoringGame: false,

  game: null,

  currentUser: null,

  didReceiveAttrs() {
    let currentUser = get(this, 'currentUser');

    if (currentUser) {
      set(this, 'team1Player1', currentUser);
    }
  },

  /* jshint ignore:start */
  @computed
  /* jshint ignore:end */
  foosballers() {
    return get(this, 'store').peekAll('foosballer');
  },

  /* jshint ignore:start */
  @computed
  /* jshint ignore:end */
  teams() {
    return get(this, 'store').peekAll('team');
  },

  /* jshint ignore:start */
  @computed
  /* jshint ignore:end */
  games() {
    return get(this, 'store').peekAll('game');
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
    let gamesService = get(this, 'gamesService');

    if (!t1p1 || !t1p2 || !t2p1 || !t2p2) {
      return RSVP.resolve();
    } else {
      let team1 = teamService.getTeam(teams, t1p1, t1p2);
      let team2 = teamService.getTeam(teams, t2p1, t2p2);

      if (window.Worker) {
        return gamesService.gamesPlayedAgainstAsync(games, team1, team2);
      } else {
        return gamesService.gamesPlayedAgainst(games, team1, team2);
      }
    }
  },

  mostRecent: Ember.computed('gamesAgainst.isFulfilled', function() {
    let gamesAgainst = get(this, 'gamesAgainst');
    let gamesService = get(this, 'gamesService');

    if (get(gamesAgainst, 'isFulfilled')) {
      let games = get(this, 'games');
      let recentGame = gamesService.mostRecentGame(get(gamesAgainst, 'content'));
      let recentStoreGame = games.findBy('id', recentGame.id);

      return getProperties(recentStoreGame, 'time', 'winningTeam', 'winningTeamWins', 'losingTeamWins');
    } else {
      return {};
    }
  }),

  /*@public Function used by ember-select to get the display value */
  retrievePlayerName(player) {
    return get(player, 'name');
  },

  /* jshint ignore:start */
  @computed('model.isNotFullyCreated')
  /* jshint ignore:end */
  cancelOrDelete(isNotFullyCreated) {
    return isNotFullyCreated ? 'Delete' : 'Cancel';
  },

  /* jshint ignore:start */
  @computed('game.team1Wins', 'game.team2Wins')
  /* jshint ignore:end */
  canSave(t1w, t2w) {
    t1w = parseInt(t1w) || 0;
    t2w = parseInt(t2w) || 0;
    let totalWins = t1w + t2w;

    return (totalWins === 2 || totalWins === 3) && (t1w > 1 || t2w > 1);
  },

  /* jshint ignore:start */
  @not('canSave') cannotSave,
  /* jshint ignore:end */

  actions: {
    cancelGame() {
      let game = get(this, 'game');
      let gameAdded = get(this, 'gameAdded');

      if (game) {
        game.rollbackAttributes();
        set(this, 'game', null);
      }

      gameAdded();
    },

    saveGame() {
      let game = get(this, 'game');
      let t1w = get(game, 'team1Wins');
      let t2w = get(game, 'team2Wins');
      let notify = get(this, 'notify');

      if (!t1w) {
        set(game, 'team1Wins', 0);
      }

      if (!t2w) {
        set(game, 'team2Wins', 0);
      }

      set(game, 'time', moment());

      let winningTeam = get(game, 'winningTeam');
      let losingTeam = get(game, 'losingTeam');
      let wp1 = get(winningTeam, 'player1.slack');
      let wp2 = get(winningTeam, 'player2.slack');
      let lp1 = get(losingTeam, 'player1.slack');
      let lp2 = get(losingTeam, 'player2.slack');
      let winningTeamWins = get(game, 'winningTeamWins');
      let losingTeamWins = get(game, 'losingTeamWins');
      let landslideWin = losingTeamWins ? false : true;

      let slackMessage = `${wp1} ${wp2} beat ${lp1} ${lp2} ${winningTeamWins} - ${losingTeamWins}`;

      if (landslideWin) {
        slackMessage += ' :burn:';
      }

      let color = landslideWin ? 'red' : 'yellow';
      let savingGameMessage = notify.success('Saving Game...', {
        closeAfter: null
      });

      game
        .save()
        .then(() => {
          savingGameMessage.set('visible', false);
          let postingToSlackMessage = notify.success('Game saved. Posting to Slack...', {
            closeAfter: null
          });

          // jscs:disable
          return new RSVP.Promise((resolve, reject) => {
            $.ajax({
              type: 'POST',
              processData: false,
              contentType: 'application/json',
              url: ENV.slackRelay,
              data: JSON.stringify({
                message: slackMessage
              }),
              success: function() {
                postingToSlackMessage.set('visible', false);
                resolve();
              }
            });
          });
          // jscs:enable
        })
        .then(() => {
          notify.success('Posted to Slack!');
        })
        .then(() => {
          let gameAdded = get(this, 'gameAdded');

          set(this, 'game', null);
          gameAdded();
        });
    },

    startGame() {
      let game = get(this, 'store').createRecord('game');
      let teamService = get(this, 'teamService');
      let teams = get(this, 'store').peekAll('team');
      let t1p1 = get(this, 'team1Player1');
      let t1p2 = get(this, 'team1Player2');
      let t2p1 = get(this, 'team2Player1');
      let t2p2 = get(this, 'team2Player2');
      let players = [[t1p1, t1p2], [t2p1, t2p2]];
      let promises = [];

      function getTeam(players) {
        let [p1, p2] = players;
        let p1Id = get(p1, 'id');
        let p2Id = get(p2, 'id');
        let foundTeam = teamService.getTeam(teams, p1Id, p2Id);

        if (foundTeam) {
          return RSVP.resolve(foundTeam);
        } else {
          return get(this, 'store').createRecord('team', {
            player1: p1,
            player2: p2
          }).save();
        }
      }

      promises = players.map(getTeam);

      RSVP.all(promises).then((teams) => {
        let [team1, team2] = teams;
        setProperties(game, {
          team1,
          team2
        });

        setProperties(this, {
          game,
          isScoringGame: true
        });
      });
    }
  }
});
