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
  @computed('model.[]', 'allTeams')
  /* jshint ignore:end */
  filteredTeams(teams, allTeams) {
    if (allTeams) {
      return teams;
    }

    let currentUser = get(this, 'session.currentUser');

    return teams.filter((t) => {
      return get(t, 'team1.player1.id') === currentUser;
    });
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
