import DS from 'ember-data';

export default DS.Model.extend({
  player1: DS.belongsTo('foosballer'),
  player2: DS.belongsTo('foosballer')
});
