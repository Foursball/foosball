import Ember from 'ember';

const { Controller, set, computed } = Ember;

export default Controller.extend({
  queryParams: ['sortAscending', 'sortBy', 'expandedId'],

  sortAscending: false,

  sortBy: 'winLossRatio',

  isAsc: computed.equal('sortAscending', true),
  isDesc: computed.equal('sortAscending', false),
  isSortWinPercentage: computed.equal('sortBy', 'winPercentage'),
  isSortWinLossRatio: computed.equal('sortBy', 'winLossRatio'),

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
