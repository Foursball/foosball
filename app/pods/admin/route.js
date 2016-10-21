import Ember from 'ember';
import { BusPublisherMixin } from 'ember-message-bus';

const {
  Route,
  RSVP: { all },
  inject: { service },
  get,
  set
} = Ember;

export default Route.extend(BusPublisherMixin, {
  session: service(),

  model() {
    let session = get(this, 'session');

    return this.store.findAll('foosballer')
      .then((foosballers) => {
        this.publish('foosballersFound', foosballers);
        return foosballers;
      })
      .then((foosballers) => {
        let currentPlayer = foosballers.findBy('uid', get(session, 'uid'));

        if (!get(currentPlayer, 'isAdmin') || !get(currentPlayer, 'isGlobalAdmin')) {
          return this.transitionTo('home');
        } else {
          return currentPlayer;
        }
      });
  },

  afterModel(currentPlayer) {
    if (get(currentPlayer, 'isGlobalAdmin')) {
      return this.store.findAll('league');
    }
  },

  setupController(controller, currentPlayer) {
    let leaguePromise = get(currentPlayer, 'league');

    leaguePromise.then((league) => set(controller, 'selectedLeague', league));
  }
});
