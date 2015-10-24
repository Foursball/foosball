import Ember from 'ember';

const { Service, set, get } = Ember;

export default Service.extend({
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
        set(scoreKeeper, 'winLossRatio', parseFloat(ratio.toFixed(2)));
      } else {
        set(scoreKeeper, 'winLossRatio', scoreKeeper.wins);
      }

      return scoreKeeper;
    });
  }
});
