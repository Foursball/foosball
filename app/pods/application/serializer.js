import DS from 'ember-data';
import Ember from 'ember';

const { merge } = Ember;

export default DS.RESTSerializer.extend({
  serializeIntoHash(data, type, record, options) {
    merge(data, this.serialize(record, options));
  }
});
