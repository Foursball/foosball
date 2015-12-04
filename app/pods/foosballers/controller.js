import Ember from 'ember';
import computed, { equal } from 'ember-computed-decorators';

const { Controller, set } = Ember;

export default Controller.extend({
  queryParams: ['sortAscending', 'sortBy', 'expandedId'],

  sortAscending: false,

  sortBy: 'winLossRatio',

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

    expandFoosballer(foosballer) {
      set(this, 'expandedId', foosballer.id);
    }
  }

});
