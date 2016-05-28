import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  foosballers: computed(function() {
    const { store } = this;

    return store.peekAll('foosballer');
  })
});
