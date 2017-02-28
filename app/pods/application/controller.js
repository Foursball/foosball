import Ember from 'ember';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend({
  dialogsService: service('dialogs'),
  session: service(),
  media: service('media'),

  foosballers: computed(function() {
    return this.store.peekAll('foosballer');
  })
});
