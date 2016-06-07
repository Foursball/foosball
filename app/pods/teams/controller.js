import Ember from 'ember';
import { equal } from 'ember-computed-decorators';
import computed from 'ember-computed-decorators';

const { Controller, set, get } = Ember;

export default Controller.extend({
  queryParams: ['sortAscending', 'sortBy', 'expandedId', 'allTeams'],

  sortAscending: false,

  sortBy: 'winLossRatio',

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
  /* jshint ignore:end */

  actions: {
    sortUp() {
      set(this, 'sortAscending', true);
    },

    sortDown() {
      set(this, 'sortAscending', false);
    },

    sortBy(prop) {
      set(this, 'sortBy', prop);
    },

    expandTeam(team) {
      set(this, 'expandedId', team.id);
    }
  }
});
