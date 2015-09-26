import DS from 'ember-data';

export default DS.Model.extend({
  team1: DS.belongsTo('team', { async: true }),
  team2: DS.belongsTo('team', { async: true }),
  team1BlackWins: DS.attr('number'),
  team1YellowWins: DS.attr('number'),
  team2BlackWins: DS.attr('number'),
  team2YellowWins: DS.attr('number'),
  time: DS.attr('string')
});
