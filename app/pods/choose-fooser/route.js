import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  model() {
    return this.store
      .findAll('foosballer')
      .then((foosballers) => {
        return foosballers.filter((f) => !get(f, 'retired'));
      });
  },

  afterModel(foosballers) {
    let uid = get(this, 'session.uid');
    let foundUser = foosballers.findBy('uid', uid);

    if (foundUser) {
      this.transitionTo('home');
    }
  }
});
