import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { Component } = Ember;

export default Component.extend({
  index: null,

  numItems: null,

  /* jshint ignore:start */
  @computed('index')
  /* jshint ignore:end */
  plusOne(index) {
    return index + 1;
  },

  // assumes the sort of the items is reversed, otherwise use plusOne
  /* jshint ignore:start */
  @computed('index', 'numItems')
  /* jshint ignore:end */
  count(index, numItems) {
    return numItems - index;
  }
});
