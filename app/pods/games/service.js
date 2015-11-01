import Ember from 'ember';
import moment from 'moment';

const { Service, get, set } = Ember;

export default Service.extend({
  gamesPlayedIn(foosballer, games) {
    let fId = get(foosballer, 'id');

    return games.filter((g) => {
      return get(g, 'team1.player1.id') === fId ||
        get(g, 'team1.player2.id') === fId ||
        get(g, 'team2.player1.id') === fId ||
        get(g, 'team2.player2.id') === fId;
    });
  },

  gamesByWeek(games) {
    return games.reduce((prev, g) => {
      let week = moment(get(g, 'time')).endOf('week').valueOf().toString();
      let weekGames = get(prev, week);

      if (!weekGames) {
        set(prev, week, [g]);
      } else {
        weekGames.push(g);
      }

      return prev;
    }, {});
  }
});
