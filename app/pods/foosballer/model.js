import DS from 'ember-data';
import Ember from 'ember';

const { computed, get } = Ember;

export default DS.Model.extend({
  name: DS.attr('string'),

  firstName: computed('name', function() {
    return get(this, 'name').split(' ')[0];
  }),

  lastName: computed('name', function() {
    return get(this, 'name').split(' ')[1];
  })
});
