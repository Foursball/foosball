import Ember from 'ember';

const { Controller, get, computed, inject } = Ember;

export default Controller.extend({
  gamesController: inject.controller('games'),

  games: computed('gamesController.model.[]', function() {
    let gamesController = get(this, 'gamesController');

    return get(gamesController, 'model');
  }),

  teamId: computed('model', function() {
    return get(this, 'model.id');
  }),

  gamesPlayedIn: computed('teamId', 'games.[]', function() {
    let games = get(this, 'games');
    let teamId = get(this, 'teamId');

    return games.filter((game) => {
      return get(game, 'team1.id') === teamId || get(game, 'team2.id') === teamId;
    });
  }),

  wins: computed('gamesPlayedIn', 'teamId', function() {
    let gamesPlayedIn = get(this, 'gamesPlayedIn');
    let teamId = get(this, 'teamId');

    return gamesPlayedIn.reduce((prev, curr) => {
      let isTeam1 = get(curr, 'team1.id') === teamId ? true : false;

      if (isTeam1) {
        prev += get(curr, 'team1Wins');
      } else {
        prev += get(curr, 'team2Wins');
      }

      return prev;
    }, 0);
  }),

  winsBlack: computed('gamesPlayedIn', 'teamId', function() {
    let gamesPlayedIn = get(this, 'gamesPlayedIn');
    let teamId = get(this, 'teamId');

    return gamesPlayedIn.reduce((prev, curr) => {
      let isTeam1 = get(curr, 'team1.id') === teamId ? true : false;

      if (isTeam1) {
        prev += get(curr, 'team1WinsBlack');
      } else {
        prev += get(curr, 'team2WinsBlack');
      }

      return prev;
    }, 0);
  }),

  winsYellow: computed('gamesPlayedIn', 'teamId', function() {
    let gamesPlayedIn = get(this, 'gamesPlayedIn');
    let teamId = get(this, 'teamId');

    return gamesPlayedIn.reduce((prev, curr) => {
      let isTeam1 = get(curr, 'team1.id') === teamId ? true : false;

      if (isTeam1) {
        prev += get(curr, 'team1WinsYellow');
      } else {
        prev += get(curr, 'team2WinsYellow');
      }

      return prev;
    }, 0);
  }),

  losses: computed('gamesPlayedIn', 'teamId', function() {
    let gamesPlayedIn = get(this, 'gamesPlayedIn');
    let teamId = get(this, 'teamId');

    return gamesPlayedIn.reduce((prev, curr) => {
      let isTeam1 = get(curr, 'team1.id') === teamId ? true : false;

      if (isTeam1) {
        prev += get(curr, 'team2Wins');
      } else {
        prev += get(curr, 'team1Wins');
      }

      return prev;
    }, 0);
  }),

  lossesBlack: computed('gamesPlayedIn', 'teamId', function() {
    let gamesPlayedIn = get(this, 'gamesPlayedIn');
    let teamId = get(this, 'teamId');

    return gamesPlayedIn.reduce((prev, curr) => {
      let isTeam1 = get(curr, 'team1.id') === teamId ? true : false;

      if (isTeam1) {
        prev += get(curr, 'team2WinsBlack');
      } else {
        prev += get(curr, 'team1WinsBlack');
      }

      return prev;
    }, 0);
  }),

  lossesYellow: computed('gamesPlayedIn', 'teamId', function() {
    let gamesPlayedIn = get(this, 'gamesPlayedIn');
    let teamId = get(this, 'teamId');

    return gamesPlayedIn.reduce((prev, curr) => {
      let isTeam1 = get(curr, 'team1.id') === teamId ? true : false;

      if (isTeam1) {
        prev += get(curr, 'team2WinsYellow');
      } else {
        prev += get(curr, 'team1WinsYellow');
      }

      return prev;
    }, 0);
  }),

  winPercentage: computed('wins', 'losses', function() {
    let wins = get(this, 'wins');
    let losses = get(this, 'losses');

    if (!losses && !wins) {
      return 'N/A';
    }

    let percentage = wins / (wins + losses) * 100;

    return percentage.toFixed(2);
  })
});
