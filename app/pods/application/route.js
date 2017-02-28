import Ember from 'ember';
import ENV from 'foosball/config/environment';

const { Route, get, set, inject: { service }, RSVP, $ } = Ember;

export default Route.extend({
  transitionService: service('transition'),
  session: service(),

  beforeModel(transition) {
    let transitionService = get(this, 'transitionService');

    set(transitionService, 'transition', transition);
  },

  model(params, transition) {
    let store = get(this, 'store');

    if (transition.targetName !== 'login') {
      return $.getJSON(`/users/current`, ({ user }) => {
        store.pushPayload('foosballer', { user });

        let storeUser = store.peekRecord('foosballer', user.id);

        this.get('session').set('currentUser', storeUser);

        return storeUser;
      });
    }
  },

  actions: {
    transitionTo(route) {
      this.transitionTo(route);
    },

    goToGame(game) {
      this.transitionTo('game', game);
    },

    goToTeam(team) {
      this.transitionTo('team', team);
    },

    goToFoosballer(foosballer) {
      this.transitionTo('foosballer', foosballer);
    },

    newGame() {
      let game = this.store.createRecord('game');

      this.transitionTo('game.new', game);
    },

    error(error, transition) {
      if (error.status === 401) {
        return this.transitionTo('login');
      }
    }
  }
});
