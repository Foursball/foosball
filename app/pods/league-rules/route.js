import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({
  model() {
    return this.store.findRecord('tenant', 'netuitive')
      .then((tenant) => get(tenant, 'rules'));
  }
});
