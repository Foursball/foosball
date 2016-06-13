import DS from 'ember-data';
import computed from 'ember-computed-decorators';
import { attr } from 'ember-computed-decorators/ember-data';

export default DS.Model.extend({
  /* jshint ignore:start */
  @attr('string') slack,
  /* jshint ignore:end */

  /* jshint ignore:start */
  @attr('string') name,
  /* jshint ignore:end */

  /* jshint ignore:start */
  @computed('name')
  /* jshint ignore:end */
  firstName(name) {
    const [first] = name ? name.split(' ') : ['', ''];
    return first;
  },

  /* jshint ignore:start */
  @computed('name')
  /* jshint ignore:end */
  lastName(name) {
    const [, last] = name ? name.split(' ') : ['', ''];
    return last;
  },

  /* jshint ignore:start */
  @computed('firstName', 'lastName')
  /* jshint ignore:end */
  displayName(firstName, lastName) {
    const [last] = lastName;

    return `${firstName} ${last}`;
  }
});
