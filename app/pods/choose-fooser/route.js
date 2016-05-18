import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  model() {
    const { store } = this;

    return store.findAll('foosballer');
  },

  afterModel(foosballers) {
    let uid = get(this, 'session.uid');
    let foundUser = foosballers.findBy('uid', uid);

    if (foundUser) {
      this.transitionTo('home');
    }
  }
});
