import DS from 'ember-data';

export default DS.Model.extend({
  league: DS.belongsTo('league'),
  name: DS.attr('string'),
  startTime: DS.attr('number'),
  endTime: DS.attr('number'),
  isActive: DS.attr('boolean', { defaultValue: false })
});
