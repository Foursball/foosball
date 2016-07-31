import Ember from 'ember';
import { BusPublisherMixin } from 'ember-message-bus';

const { Route, get, set, inject: { service } } = Ember;

export default Route.extend(BusPublisherMixin, {
  transitionService: service('transition'),

  beforeModel(transition) {
    let transitionService = get(this, 'transitionService');

    set(transitionService, 'transition', transition);
  },

  afterModel(model, transition) {
    if (transition.targetName !== 'login') {
      return this.store
        .findAll('foosballer')
        .then((foosballers) => this.publish('foosballersFound', foosballers))
        .then(() => this.store.findAll('game'))
        .then(() => this.store.findAll('team'));
    }
  },

  actions: {
    accessDenied() {
      this.transitionTo('login');
    },

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
      this.transitionTo('something-happened');
    },

    logout() {
      get(this, 'session').close();
      this.transitionTo('login');
    }
  }
});
