import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  beforeModel() {
    get(this, 'session').close();
    window.location.href = '/login';
  }
});
