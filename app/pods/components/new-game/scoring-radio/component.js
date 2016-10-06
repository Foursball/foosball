import Ember from 'ember';

const { Component, set, get } = Ember;

export default Component.extend({
  game: null,

  groupValue: null,

  actions: {
    updateScore(score) {
      let game = get(this, 'game');
      let team1Wins;
      let team2Wins;

      if (score === 't1-2-0') {
        team1Wins = 2;
        team2Wins = 0;
      } else if (score === 't1-2-1') {
        team1Wins = 2;
        team2Wins = 1;
      } else if (score === 't2-2-0') {
        team1Wins = 0;
        team2Wins = 2;
      } else if (score === 't2-2-1') {
        team1Wins = 1;
        team2Wins = 2;
      } else {
        throw new Error('Unrecognized input for new game');
      }

      game.setProperties({ team1Wins, team2Wins });
      set(this, 'groupValue', score);
    }
  }
});
