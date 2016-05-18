import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { Controller, get, set, inject: { service } } = Ember;

export default Controller.extend({
  /* jshint ignore:start */
  @computed('model.[]')
  /* jshint ignore:end */
  nonLinkedFoosers(foosballers) {
    return foosballers.filter((f) => !get(f, 'uid'));
  },

  selectedFoosballer: null,

  actions: {
    linkUser() {
      let uid = get(this, 'session.uid');
      let selectedFoosballer = get(this, 'selectedFoosballer');

      if (selectedFoosballer) {
        set(selectedFoosballer, 'uid', uid);

        selectedFoosballer
          .save()
          .then(() => {
            this.transitionToRoute('home');
          });
      }
    }
  }
});
