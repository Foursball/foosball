import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  actions: {
    login(provider) {
      const { store } = this;
      let session = get(this, 'session');

      session
        .open('firebase', { provider })
        .then((data) => {
          let foosers = store.findAll('foosballer')
            .then((foosballers) => {
              let authedFoosballer = foosballers.findBy('id', data.uid);

              if (authedFoosballer) {
                this.transitionTo('home');
              } else {
                this.transitionTo('choose-fooser');
              }
            });
        });
    },

    logout() {
      let session = get(this, 'session');

      session.close();
    }
  }
});
