import Ember from 'ember';
import computed from 'ember-computed-decorators';

const {
  Controller,
  get,
  set,
  setProperties,
  inject: { service }
} = Ember;

export default Controller.extend({
  /* jshint ignore:start */
  @computed('model.[]')
  /* jshint ignore:end */
  nonLinkedFoosers(foosballers) {
    return foosballers.filter((f) => !get(f, 'uid'));
  },

  selectedFoosballer: null,

  actions: {
    selectUser(user) {
      set(this, 'selectedFoosballer', user);
    },

    linkUser() {
      let uid = get(this, 'session.uid');
      let provider = get(this, 'session.provider');
      let profileImageURL = get(this, 'session.currentUser.providerData.firstObject.photoURL');
      let selectedFoosballer = get(this, 'selectedFoosballer');

      if (selectedFoosballer) {
        setProperties(selectedFoosballer, {
          uid,
          profileImageURL
        });

        selectedFoosballer
          .save()
          .then(() => {
            this.transitionToRoute('home');
          });
      }
    }
  }
});
