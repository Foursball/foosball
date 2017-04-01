import DS from 'ember-data';
import ENV from 'foosball/config/environment';

export default DS.RESTAdapter.extend({
  host: ENV.apiDomain
});
