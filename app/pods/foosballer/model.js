import DS from 'ember-data';
import computed from 'ember-computed-decorators';
import { attr } from 'ember-computed-decorators/ember-data';

export default DS.Model.extend({
  /* jshint ignore:start */
  @attr('string') slack,
  @attr('string') name,
  @attr('string') uid,
  @attr('string') profileImageURL,
  @attr('boolean') retired,
  @attr('boolean') hasMinimumGames,
  @attr('boolean') active,
  /* jshint ignore:end */

  isGlobalAdmin: DS.attr('boolean', { defaultValue: false }),
  isAdmin: DS.attr('boolean', { defaultValue: false }),
  league: DS.belongsTo('league'),

  /* jshint ignore:start */
  @computed('name')
  /* jshint ignore:end */
  firstName(name) {
    let [first] = name ? name.split(' ') : ['', ''];
    return first;
  },

  /* jshint ignore:start */
  @computed('name')
  /* jshint ignore:end */
  lastName(name) {
    let [, last] = name ? name.split(' ') : ['', ''];
    return last;
  },

  /* jshint ignore:start */
  @computed('firstName', 'lastName')
  /* jshint ignore:end */
  displayName(firstName, lastName) {
    let [last] = lastName;

    return `${firstName} ${last}`;
  }
});
