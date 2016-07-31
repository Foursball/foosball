import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  foosballers: computed(function() {
    return this.store.peekAll('foosballer');
  })
});
