import Ember from 'ember';
import moment from 'moment';

const { Route, set, get, RSVP, $ } = Ember;

export default Route.extend({
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

      game
        .save()
        .then(() => {
          // jscs:disable
          return new RSVP.Promise((resolve, reject) => {
            $.ajax({
              type: 'POST',
              processData: false,
              contentType: 'application/json',
              url: 'https://7xtn2nu154.execute-api.us-west-2.amazonaws.com/prod/hipchat',
              data: JSON.stringify({
                message: hipchatMessage,
                message_format: 'text',
                color,
                notify: 1
              }),
              success: resolve
            });
          });
          // jscs:enable
        })
        .then(() => this.transitionTo('games'));
    }
  }
});
