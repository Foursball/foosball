import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  actions: {
    login(provider) {
      let session = get(this, 'session');

      session
        .open('firebase', { provider })
        .then((data) => {
          this.transitionTo('home');
        });
    },

    logout() {
      let session = get(this, 'session');

      session.close();
    }
  }
});