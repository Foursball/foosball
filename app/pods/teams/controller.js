import Ember from 'ember';
import { equal } from 'ember-computed-decorators';
import computed from 'ember-computed-decorators';

const { Controller, set, get, setProperties } = Ember;

export default Controller.extend({
  queryParams: ['sortAscending', 'sortBy', 'expandedId', 'allTeams'],

  sortAscending: true,

  sortBy: 'rank',

  allTeams: true,

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end*/
  foosballers() {
    const { store } = this;

    return store.peekAll('foosballer');
  },

  /* jshint ignore:start */
  @equal('sortAscending', true) isAsc,
  @equal('sortAscending', false) isDesc,
  @equal('sortBy', 'winPercentage') isSortWinPercentage,
  @equal('sortBy', 'winLossRatio') isSortWinLossRatio,
  @equal('sortBy', 'wins') isSortWins,
  @equal('sortBy', 'rank') isSortRank,
  /* jshint ignore:end */

  actions: {
    sortBy(prop) {
      let sortBy = get(this, 'sortBy');

      if (sortBy === prop) {
        this.toggleProperty('sortAscending');
      } else {
        setProperties(this, {
          sortBy: prop,
          sortAscending: false
        });
      }
    },

    expandTeam(team) {
      set(this, 'expandedId', team.id);
    }
  }
});
