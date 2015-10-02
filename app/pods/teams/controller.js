import Ember from 'ember';

const { Controller, set, computed } = Ember;

export default Controller.extend({
  queryParams: ['sortAscending', 'sortBy'],

  sortAscending: false,

  sortBy: 'winPercentage',

  isAsc: computed.equal('sortAscending', true),
  isDesc: computed.equal('sortAscending', false),
  isSortWinPercentage: computed.equal('sortBy', 'winPercentage'),
  isSortLosses: computed.equal('sortBy', 'losses'),
  isSortWins: computed.equal('sortBy', 'wins'),

  actions: {
    sortUp() {
      set(this, 'sortAscending', true);
    },

    sortDown() {
      set(this, 'sortAscending', false);
    },

    sortBy(prop) {
      set(this, 'sortBy', prop);
    }
  }
});
