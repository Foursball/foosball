import Ember from 'ember';

const { Service, get, set } = Ember;

export default Service.extend({
  winLossByTimePeriod(foosballer, groupedGames) {
    return Object.keys(groupedGames).reduce((prev, time) => {
      let games = get(groupedGames, time);
      let [wins, losses] = this.winsLossesInGames(foosballer, games);

      set(prev, time, { wins, losses });

      return prev;
    }, {});
  },

  winLossRatioByTimePeriod(foosballer, groupedGames) {
    let winLossByTimePeriod = this.winLossByTimePeriod(foosballer, groupedGames);

    return Object.keys(winLossByTimePeriod).reduce((prev, time) => {
      let obj = get(winLossByTimePeriod, time);
      let losses = get(obj, 'losses');
      let wins = get(obj, 'wins');
      let ratio = wins / (losses || 1);
      set(prev, time, ratio);

      return prev;
    }, {});
  },

  winsLossesInGames(foosballer, games) {
    let wins = 0;
    let losses = 0;
    games.forEach((game) => {
      let [w, l] = this.winLossInGame(foosballer, game);
      wins += w;
      losses += l;
    });

    return [wins, losses];
  },

  cummulativeWinLossByTimePeriod(foosballer, groupedGames) {
    let obj = {};
    let keys = Object.keys(groupedGames);

    for (let i = 0; i < keys.length; i++) {
      let time = keys[i];
      let games = groupedGames[time];
      let [wins, losses] = this.winsLossesInGames(foosballer, games);

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

  winLossInGame(foosballer, game) {
    let teamPlayedOn = this.teamPlayedOn(foosballer, game);

    return [get(game, `${teamPlayedOn}Wins`), get(game, `${teamPlayedOn}Losses`)];
  },

  teamPlayedOn(foosballer, game) {
    let fId = get(foosballer, 'id');

    return get(game, 'team1.player1.id') === fId || get(game, 'team1.player2.id') === fId ? 'team1' : 'team2';
  },

  decorate(foosballers, decoratedTeams) {
    let decoratedFoosballers = foosballers
      .map((foosballer) => {
        let foosballerId = get(foosballer, 'id');
        let teamsPlayedIn = decoratedTeams.filter((team) => {
          return get(team, 'team.player1.id') === foosballerId || get(team, 'team.player2.id') === foosballerId;
        });
        let scoreKeeper = {
          foosballer,
          wins: 0,
          winsBlack: 0,
          winsYellow: 0,
          losses: 0,
          lossesBlack: 0,
          lossesYellow: 0,
          winPercentage: 0,
          winLossRatio: 0
        };

        scoreKeeper = teamsPlayedIn.reduce((prev, curr) => {
          prev.wins += get(curr, 'wins');
          prev.winsBlack += get(curr, 'winsBlack');
          prev.winsYellow += get(curr, 'winsYellow');
          prev.losses += get(curr, 'losses');
          prev.lossesBlack += get(curr, 'lossesBlack');
          prev.lossesYellow += get(curr, 'lossesYellow');

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

    decoratedFoosballers
      .sortBy('winLossRatio')
      .reverse()
      .forEach((f, index) => set(f, 'rank', ++index));

    return decoratedFoosballers;
  }
});
