import Ember from 'ember';

const { Service, get, set } = Ember;

export default Service.extend({
  decorate(foosballers, decoratedTeams) {
    return foosballers.map((foosballer) => {
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
        set(scoreKeeper, 'winLossRatio', parseFloat(ratio.toFixed(2)));
      } else {
        set(scoreKeeper, 'winLossRatio', scoreKeeper.wins);
      }

      return scoreKeeper;
    });
  }
});
