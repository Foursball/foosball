import Ember from 'ember';
import { BusPublisherMixin } from 'ember-message-bus';

const { Route, get, inject: { service } } = Ember;

export default Route.extend(BusPublisherMixin, {
  transitionService: service('transition'),

  actions: {
    login(provider) {
      const { store } = this;
      let session = get(this, 'session');
      let transitionService = get(this, 'transitionService');

      session
        .open('firebase', { provider })
        .then((data) => {
          return store
            .findAll('foosballer')
            .then((foosballers) => {
              let authedFoosballer = foosballers.findBy('uid', data.uid);

              if (authedFoosballer) {
                this.publish('foosballersFound', foosballers);
                let transition = get(transitionService, 'transition');

                if (transition) {
                  transition.retry();
                } else {
                  this.transitionTo('home');
                }
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
