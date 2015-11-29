import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  index: null,

  numItems: null,

  plusOne: computed('index', function() {
    return get(this, 'index') + 1;
  }),

  // assumes the sort of the items is reversed, otherwise use plusOne
  count: computed('index', 'numItems', function() {
    let index = get(this, 'index');
    let numItems = get(this, 'numItems');

    return numItems - index;
  })
});
