import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { Component, inject, get } = Ember;

export default Component.extend({
  store: inject.service(),
  teamDecorator: inject.service(),
  foosballerDecorator: inject.service(),

  /* jshint ignore:start */
  @computed
  /* jshint ignore:end */
  games() {
    return get(this, 'store').peekAll('game');
  },

  /* jshint ignore:start */
  @computed
  /* jshint ignore:end */
  teams() {
    return get(this, 'store').peekAll('team');
  },

  /* jshint ignore:start */
  @computed
  /* jshint ignore:end */
  foosballers() {
    return get(this, 'store').peekAll('foosballer');
  },

  sortAscending: false,

  shouldFilterMinimumGames: true,

  sortBy: 'winPercentage',

  /* jshint ignore:start */
  @computed('teams.[]', 'games.[]')
  /* jshint ignore:end */
  decoratedTeams(teams, games) {
    let teamDecorator = get(this, 'teamDecorator');

    return teamDecorator.decorate(teams, games, false);
  },

  /* jshint ignore:start */
  @computed('decoratedTeams.[]', 'shouldFilterMinimumGames')
  /* jshint ignore:end */
  decoratedFoosballers(decoratedTeams, shouldFilterMinimumGames) {
    let foosballers = get(this, 'foosballers');
    let foosballerDecorator = get(this, 'foosballerDecorator');

    return foosballerDecorator.decorate(foosballers, decoratedTeams, shouldFilterMinimumGames);
  },

  /* jshint ignore:start */
  @computed('sortAscending', 'sortBy', 'decoratedFoosballers.[]')
  /* jshint ignore:end */
  sortedFoosballers(sortAscending, sortBy, decoratedFoosballers) {
    let sortedFoosballers = decoratedFoosballers.sortBy(sortBy);

    return sortAscending ? sortedFoosballers : sortedFoosballers.reverse();
  }
});
