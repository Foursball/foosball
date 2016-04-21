import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  beforeModel() {
    let session = get(this, 'session');

    return session
      .fetch()
      .catch(() => this.transitionTo('login'));
  },

  // redirect() {
  //   this.transitionTo('home');
  // },

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

    // error(error, transition) {
    //   this.transitionTo('something-happened');
    // },

    logout() {
      get(this, 'session').close();
    }
  }
});
