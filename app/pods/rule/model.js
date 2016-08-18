import DS from 'ember-data';

export default DS.Model.extend({
  message: DS.attr('string'),

  date: DS.attr()
});
