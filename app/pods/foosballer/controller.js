import Ember from 'ember';

const { Controller, computed, inject, get } = Ember;

export default Controller.extend({
  foosballerDecorator: inject.service(),
  teamDecorator: inject.service(),

  games: computed(function() {
    return get(this, 'store').findAll('game');
  }),

  teams: computed(function() {
    return get(this, 'store').findAll('team');
  }),

  decoratedTeams: computed('teams.[]', 'games.[]', function() {
    let games = get(this, 'games');
    let teams = get(this, 'teams');
    let teamDecorator = get(this, 'teamDecorator');

    return teamDecorator.decorate(teams, games);
  }),

  foosballer: computed('model', 'foosballers.[]', 'decoratedTeams.[]', function() {
    let model = get(this, 'model');
    let decoratedTeams = get(this, 'decoratedTeams');
    let foosballerDecorator = get(this, 'foosballerDecorator');

    return get(foosballerDecorator.decorate([model], decoratedTeams), 'firstObject');
  })
});
