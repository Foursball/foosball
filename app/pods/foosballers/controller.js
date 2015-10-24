import Ember from 'ember';

const { Controller, computed, get, set } = Ember;

export default Controller.extend({
  queryParams: ['sortAscending', 'sortBy'],

  sortAscending: false,

  sortBy: 'winLossRatio',

  isAsc: computed.equal('sortAscending', true),
  isDesc: computed.equal('sortAscending', false),
  isSortWinPercentage: computed.equal('sortBy', 'winPercentage'),
  isSortWinLossRatio: computed.equal('sortBy', 'winLossRatio'),
  sortedFoosballers: computed('model.[]', function() {
    return get(this, 'model').sortBy('name');
  }),

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
