import DS from 'ember-data';

export default DS.Model.extend({
  rules: DS.hasMany('rule'),
  name: DS.attr('string'),
  foosballers: DS.hasMany('foosballer'),
  seasons: DS.hasMany('season')
});
