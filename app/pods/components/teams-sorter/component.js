import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { Component, inject, get } = Ember;

export default Component.extend({
  store: inject.service(),
  teamDecorator: inject.service(),

  /* jshint ignore:start */
  @computed
  /* jshint ignore:end */
  games() {
    return get(this, 'store').findAll('game');
  },

  teams: [],

  sortAscending: false,

  sortBy: 'winPercentage',

  /* jshint ignore:start */
  @computed('teams.[]', 'games.[]')
  /* jshint ignore:end */
  decoratedTeams(teams, games) {
    let teamDecorator = get(this, 'teamDecorator');

    return teamDecorator.decorate(teams, games);
  },

  /* jshint ignore:start */
  @computed('sortAscending', 'sortBy', 'decoratedTeams.[]')
  /* jshint ignore:end */
  sortedTeams(sortAscending, sortBy, decoratedTeams) {
    let sortedTeams = decoratedTeams.sortBy(sortBy);

    return sortAscending ? sortedTeams : sortedTeams.reverse();
  }
});
