import Ember from 'ember';
import moment from 'moment';
import ENV from 'foosball/config/environment';

const { Route, set, get, RSVP, $, inject: { service } } = Ember;

export default Route.extend({
  notify: service(),

  afterModel() {
    const { store } = this;

    return store.findAll('game');
  },

  actions: {
    saveGame(game) {
      let t1bw = get(game, 'team1WinsBlack');
      let t1yw = get(game, 'team1WinsYellow');
      let t2bw = get(game, 'team2WinsBlack');
      let t2yw = get(game, 'team2WinsYellow');
      const notify = get(this, 'notify');

      if (!t1bw) {
        set(game, 'team1WinsBlack', 0);
      }

      if (!t1yw) {
        set(game, 'team1WinsYellow', 0);
      }

      if (!t2bw) {
        set(game, 'team2WinsBlack', 0);
      }

      if (!t2yw) {
        set(game, 'team2WinsYellow', 0);
      }

      set(game, 'time', moment());

      let winningTeam = get(game, 'winningTeam');
      let losingTeam = get(game, 'losingTeam');
      let wp1 = get(winningTeam, 'player1.hipchat');
      let wp2 = get(winningTeam, 'player2.hipchat');
      let lp1 = get(losingTeam, 'player1.hipchat');
      let lp2 = get(losingTeam, 'player2.hipchat');
      let winningTeamWins = get(game, 'winningTeamWins');
      let losingTeamWins = get(game, 'losingTeamWins');
      let landslideWin = losingTeamWins ? false : true;

      let hipchatMessage = `${wp1} ${wp2} beat ${lp1} ${lp2} ${winningTeamWins} - ${losingTeamWins}`;

      if (landslideWin) {
        hipchatMessage += ' (burn)';
      }

      let color = landslideWin ? 'red' : 'yellow';
      let savingGameMessage = notify.success('Saving Game...', {
        closeAfter: null
      });

      game
        .save()
        .then(() => {
          savingGameMessage.set('visible', false);
          let postingToHipChatMessage = notify.success('Game saved. Posting to Hipchat...', {
            closeAfter: null
          });
          if (ENV.environment === 'development') {
            return RSVP.resolve();
          } else {
            // jscs:disable
            return new RSVP.Promise((resolve, reject) => {
              $.ajax({
                type: 'POST',
                processData: false,
                contentType: 'application/json',
                url: 'https://035946labg.execute-api.us-east-1.amazonaws.com/prod/hipchat',
                data: JSON.stringify({
                  message: hipchatMessage,
                  message_format: 'text',
                  color,
                  notify: 1
                }),
                success: function() {
                  postingToHipChatMessage.set('visible', false);
                  resolve();
                }
              });
            });
            // jscs:enable
          }
        })
        .then(() => {
          notify.success('Posted to Hipchat! Going back to the games page...');
        })
        .then(() => this.transitionTo('games'));
    }
  }
});
