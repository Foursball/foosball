import Ember from 'ember';

const { Service, set, get } = Ember;

export default Service.extend({
  winLossByTimePeriod(team, groupedGames) {
    return Object.keys(groupedGames).reduce((prev, time) => {
      let games = get(groupedGames, time);
      let [wins, losses] = this.winsLossesInGames(team, games);

      set(prev, time, { wins, losses });

      return prev;
    }, {});
  },

  winLossRatioByTimePeriod(team, groupedGames) {
    let winLossByTimePeriod = this.winLossByTimePeriod(team, groupedGames);

    return Object.keys(winLossByTimePeriod).reduce((prev, time) => {
      let obj = get(winLossByTimePeriod, time);
      let losses = get(obj, 'losses');
      let wins = get(obj, 'wins');
      let ratio = wins / (losses || 1);
      set(prev, time, ratio);

      return prev;
    }, {});
  },

  winsLossesInGames(team, games) {
    let wins = 0;
    let losses = 0;
    games.forEach((game) => {
      let [w, l] = this.winLossInGame(team, game);
      wins += w;
      losses += l;
    });

    return [wins, losses];
  },

  cummulativeWinLossByTimePeriod(team, groupedGames) {
    let obj = {};
    let keys = Object.keys(groupedGames);

    for (let i = 0; i < keys.length; i++) {
      let time = keys[i];
      let games = groupedGames[time];
      let [wins, losses] = this.winsLossesInGames(team, games);

      if (!i) {
        set(obj, time, { wins, losses });
      } else {
        let prevWins = get(obj, keys[i - 1]).wins;
        let prevLosses = get(obj, keys[i - 1]).losses;
        set(obj, time, { wins: wins + prevWins, losses: losses + prevLosses });
      }
    }

    return obj;
  },

  winLossInGame(team, game) {
    let whichTeam = this.whichTeam(team, game);

    return [get(game, `${whichTeam}Wins`), get(game, `${whichTeam}Losses`)];
  },

  whichTeam(team, game) {
    let tId = get(team, 'id');
    let t1Id = get(game, 'team1.id');
    let t2Id = get(game, 'team2.id');
    return get(game, 'team1.id') === tId ? 'team1' : 'team2';
  },

  decorate(teams, games) {
    return teams.map((team) => {
      let teamId = get(team, 'id');
      let gamesPlayedIn = games.filter((game) => {
        return get(game, 'team1.id') === teamId || get(game, 'team2.id') === teamId;
      });
      let scoreKeeper = {
        team,
        wins: 0,
        winsBlack: 0,
        winsYellow: 0,
        losses: 0,
        lossesBlack: 0,
        lossesYellow: 0,
        winPercentage: 0,
        winLossRatio: 0

      };
      scoreKeeper = gamesPlayedIn.reduce((prev, curr) => {
        let isTeam1 = get(curr, 'team1.id') === teamId ? true : false;

        if (isTeam1) {
          prev.wins += get(curr, 'team1Wins');
          prev.winsBlack += get(curr, 'team1WinsBlack');
          prev.winsYellow += get(curr, 'team1WinsYellow');
          prev.losses += get(curr, 'team2Wins');
          prev.lossesBlack += get(curr, 'team2WinsBlack');
          prev.lossesYellow += get(curr, 'team2WinsYellow');
        } else {
          prev.wins += get(curr, 'team2Wins');
          prev.winsBlack += get(curr, 'team2WinsBlack');
          prev.winsYellow += get(curr, 'team2WinsYellow');
          prev.losses += get(curr, 'team1Wins');
          prev.lossesBlack += get(curr, 'team1WinsBlack');
          prev.lossesYellow += get(curr, 'team1WinsYellow');
        }

        return prev;
      }, scoreKeeper);

      if (scoreKeeper.losses || scoreKeeper.wins) {
        let percentage = scoreKeeper.wins / (scoreKeeper.wins + scoreKeeper.losses) * 100;
        set(scoreKeeper, 'winPercentage', parseFloat(percentage.toFixed(2)));
      }

      if (scoreKeeper.losses) {
        let ratio = scoreKeeper.wins / scoreKeeper.losses;
        set(scoreKeeper, 'winLossRatio', parseFloat(ratio.toFixed(3)));
      } else {
        set(scoreKeeper, 'winLossRatio', scoreKeeper.wins);
      }

      return scoreKeeper;
    });
  }
});
