import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  model() {
    return this.store.findRecord('league', 'netuitive')
      .then((league) => get(league, 'rules'));
  }
});
