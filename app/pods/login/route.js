import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  beforeModel() {
    if (get(this, 'session.isAuthenticated')) {
      this.transitionTo('home');
    }
  },

  actions: {
    login(provider) {
      let session = get(this, 'session');

      session
        .open('firebase', { provider })
        .then((data) => {
          this.transitionTo('home');
        });
    }
  }
});
