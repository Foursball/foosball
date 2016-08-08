import DS from 'ember-data';
import Ember from 'ember';
import computed, { alias, equal, not } from 'ember-computed-decorators';

const { get } = Ember;

export default DS.Model.extend({
  team1: DS.belongsTo('team', { async: true }),
  team2: DS.belongsTo('team', { async: true }),
  team1Wins: DS.attr('number'),
  team2Wins: DS.attr('number'),
  time: DS.attr('string'),

  /* jshint ignore:start */
  @alias('team2Wins') team1Losses,
  @alias('team1Wins') team2Losses,
  @equal('winner', 'team1') team1IsWinner,
  @equal('winner', 'team2') team2IsWinner,
  @not('time') isNotFullyCreated,
  /* jshint ignore:end */

  /* jshint ignore:start */
  @computed('team1Wins', 'team2Wins')
  /* jshint ignore:end */
  winner(team1Wins, team2Wins) {
    return team1Wins > team2Wins ? 'team1' : 'team2';
  },

  /* jshint ignore:start */
  @computed('team1IsWinner')
  /* jshint ignore:end */
  winningTeam(team1IsWinner) {
    return team1IsWinner ? get(this, 'team1') : get(this, 'team2');
  },

  /* jshint ignore:start */
  @computed('team1IsWinner')
  /* jshint ignore:end */
  losingTeam(team1IsWinner) {
    return team1IsWinner ? get(this, 'team2') : get(this, 'team1');
  },

  /* jshint ignore:start */
  @computed('winner')
  /* jshint ignore:end */
  winningTeamWins(winner) {
    return get(this, `${winner}Wins`);
  },

  /* jshint ignore:start */
  @computed('winner')
  /* jshint ignore:end */
  losingTeamWins(winner) {
    let team = winner === 'team1' ? 'team2' : 'team1';

    return get(this, `${team}Wins`);
  }
});
