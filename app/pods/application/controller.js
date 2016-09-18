import Ember from 'ember';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend({
  dialogsService: service('dialogs'),
  FlexiLayout: service('device/layout'),

  foosballers: computed(function() {
    return this.store.peekAll('foosballer');
  })
});
