import Ember from 'ember';
import { BusPublisherMixin } from 'ember-message-bus';
import ENV from 'foosball/config/environment';

const { Route, get, inject: { service } } = Ember;

export default Route.extend(BusPublisherMixin, {
  transitionService: service('transition'),

  actions: {
    login(provider) {
      let session = get(this, 'session');

      window.location.href = `${ENV.apiDomain}/auths/${provider}`;
    },

    logout() {
      // let session = get(this, 'session');
      //
      // session.close();
    }
  }
});
