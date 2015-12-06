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
      let week = moment(new Date(get(g, 'time'))).endOf('week').valueOf().toString();
      let weekGames = get(prev, week);

      if (!weekGames) {
        set(prev, week, [g]);
      } else {
        weekGames.push(g);
      }

      return prev;
    }, {});
  },

  gamesPlayedAgainst(games, team1, team2) {
    return this.legitGames(games)
      .filter((g) => {
        let t1 = get(g, 'team1.id');
        let t2 = get(g, 'team2.id');
        let team1Id = get(team1, 'id');
        let team2Id = get(team2, 'id');

        return (t1 === team1Id || t1 === team2Id) &&
          (t2 === team1Id || t2 === team2Id);
      });
  },

  legitGames(games) {
    return games.filter((g) => get(g, 'time'));
  },

  mostRecentGame(games) {
    let recentGame;

    games.forEach((g) => {
      if (!recentGame) {
        recentGame = g;
      } else {
        let gTime = new Date(get(g, 'time'));
        let recentGameTime = new Date(get(recentGame, 'time'));

        if (gTime > recentGameTime) {
          recentGame = g;
        }
      }
    });

    return recentGame;
  },

  winsForTeam(team, gamesPlayedIn) {
    let wins = 0;
    let teamId = get(team, 'id');

    gamesPlayedIn.forEach((g) => {
      let whichTeam = get(g, 'team1.id') === teamId ? get(g, 'team1') : get(g, 'team2');
      let winningTeam = get(g, 'winningTeam');
      let isWinner = get(whichTeam, 'id') === get(winningTeam, 'id');

      if (isWinner) {
        wins += get(g, 'winningTeamWins');
      } else {
        wins += get(g, 'losingTeamWins');
      }
    });

    return wins;
  }
});
