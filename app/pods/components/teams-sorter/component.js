import Ember from 'ember';

const { Component, inject, get, computed } = Ember;

export default Component.extend({
  store: inject.service(),
  teamDecorator: inject.service(),

  games: computed(function() {
    return get(this, 'store').findAll('game');
  }),

  teams: [],

  sortAscending: false,

  sortBy: 'winPercentage',

  decoratedTeams: computed('teams.[]', 'games.[]', function() {
    let games = get(this, 'games');
    let teams = get(this, 'teams');
    let teamDecorator = get(this, 'teamDecorator');

    return teamDecorator.decorate(teams, games);
  }),

  sortedTeams: computed('sortAscending', 'sortBy', 'decoratedTeams.[]', function() {
    let sortAscending = get(this, 'sortAscending');
    let sortBy = get(this, 'sortBy');
    let decoratedTeams = get(this, 'decoratedTeams');
    let sortedTeams = decoratedTeams.sortBy(sortBy);

    return sortAscending ? sortedTeams : sortedTeams.reverse();
  })
});
