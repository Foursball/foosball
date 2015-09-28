import Ember from 'ember';

const { Controller, computed, get } = Ember;

export default Controller.extend({
  cancelOrDelete: computed('model.isNotFullyCreated', function() {
    return get(this, 'model.isNotFullyCreated') ? 'Delete' : 'Cancel';
  })
});
