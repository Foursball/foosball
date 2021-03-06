import Ember from 'ember';

const {
  Component,
  inject: { service },
  get
} = Ember;

export default Component.extend({
  dialogsService: service('dialogs'),

  tagName: '',

  save() {
    throw new Error('Save action must be passed into dialog-wrapper');
  },

  cancel() {
    throw new Error('Cancel action must be passed into dialog-wrapper');
  },

  actions: {
    save() {
      get(this, 'save')(...arguments);
    },

    cancel() {
      get(this, 'cancel')(...arguments);
    }
  }
});
