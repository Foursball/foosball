import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  actions: {
    transitionTo(route) {
      this.transitionTo(route);
    }
  }
});
