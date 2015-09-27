import DS from 'ember-data';
import moment from 'moment';

export default DS.Transform.extend({
  deserialize(serialized) {
    return moment(serialized);
  },

  serialize(deserialized) {
    if (deserialized) {
      return deserialized.format();
    } else {
      return '';
    }
  }
});
