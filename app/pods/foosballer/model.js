import DS from 'ember-data';
import Ember from 'ember';

const { computed, get } = Ember;

export default DS.Model.extend({
  name: DS.attr('string'),

  firstName: computed('name', function() {
    let name = get(this, 'name');
    const [first] = name ? name.split(' ') : ['', ''];
    return first;
  }),

  lastName: computed('name', function() {
    let name = get(this, 'name');
    const [, last] = name ? name.split(' ') : ['', ''];
    return last;
  }),

  displayName: computed('firstName', 'lastName', function() {
    let firstName = get(this, 'firstName');
    const [last] = get(this, 'lastName');

    return `${firstName} ${last}`;
  })
});
