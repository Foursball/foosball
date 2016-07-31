import Ember from 'ember';
import computed, { equal, alias } from 'ember-computed-decorators';

const { Controller, set, get, setProperties } = Ember;

export default Controller.extend({
  queryParams: ['sortAscending', 'sortBy'],

  sortAscending: true,

  sortBy: 'rank',

  /* jshint ignore:start */
  @equal('sortAscending', true) isAsc,
  @equal('sortAscending', false) isDesc,
  @equal('sortBy', 'winPercentage') isSortWinPercentage,
  @equal('sortBy', 'winLossRatio') isSortWinLossRatio,
  @equal('sortBy', 'foosballer.name') isSortName,
  @equal('sortBy', 'wins') isSortWins,
  @equal('sortBy', 'rank') isSortRank,
  @alias('model') foosballers,
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
    }
  }

});
