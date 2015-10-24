import Ember from 'ember';

const { Component, inject, get, computed } = Ember;

export default Component.extend({
  store: inject.service(),
  teamDecorator: inject.service(),
  foosballerDecorator: inject.service(),

  games: computed(function() {
    return get(this, 'store').findAll('game');
  }),

  teams: computed(function() {
    return get(this, 'store').findAll('team');
  }),

  foosballers: [],

  sortAscending: false,

  sortBy: 'winPercentage',

  decoratedTeams: computed('teams.[]', 'games.[]', function() {
    let games = get(this, 'games');
    let teams = get(this, 'teams');
    let teamDecorator = get(this, 'teamDecorator');

    return teamDecorator.decorate(teams, games);
  }),

  decoratedFoosballers: computed('decoratedTeams.[]', function() {
    let foosballers = get(this, 'foosballers');
    let decoratedTeams = get(this, 'decoratedTeams');
    let foosballerDecorator = get(this, 'foosballerDecorator');

    return foosballerDecorator.decorate(foosballers, decoratedTeams);
  }),

  sortedFoosballers: computed('sortAscending', 'sortBy', 'decoratedFoosballers.[]', function() {
    let sortAscending = get(this, 'sortAscending');
    let sortBy = get(this, 'sortBy');
    let decoratedFoosballers = get(this, 'decoratedFoosballers');
    let sortedFoosballers = decoratedFoosballers.sortBy(sortBy);

    return sortAscending ? sortedFoosballers : sortedFoosballers.reverse();
  })
});
