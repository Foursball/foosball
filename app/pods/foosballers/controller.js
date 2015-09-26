import Ember from 'ember';

const { Controller, computed, get } = Ember;

export default Controller.extend({
  sortedFoosballers: computed('model.[]', function() {
    return get(this, 'model').sortBy('name');
  })
});
