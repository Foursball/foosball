import DS from 'ember-data';
import Ember from 'ember';
import computed, { alias, equal, not } from 'ember-computed-decorators';

const { get } = Ember;

export default DS.Model.extend({
  team1: DS.belongsTo('team', { async: true }),
  team2: DS.belongsTo('team', { async: true }),
  team1WinsBlack: DS.attr('number', { defaultValue: 0 }),
  team1WinsYellow: DS.attr('number', { defaultValue: 0 }),
  team2WinsBlack: DS.attr('number', { defaultValue: 0 }),
  team2WinsYellow: DS.attr('number', { defaultValue: 0 }),
  time: DS.attr('string'),

  /* jshint ignore:start */
  @computed('team1WinsBlack', 'team2WinsBlack')
  /* jshint ignore:end */
  blackWins(team1WinsBlack, team2WinsBlack) {
    return team1WinsBlack + team2WinsBlack;
  },

  /* jshint ignore:start */
  @computed('team1WinsYellow', 'team2WinsYellow')
  /* jshint ignore:end */
  yellowWins(team1WinsYellow, team2WinsYellow) {
    return team1WinsYellow + team2WinsYellow;
  },

  /* jshint ignore:start */
  @computed('team1WinsBlack', 'team1WinsYellow')
  /* jshint ignore:end */
  team1Wins(team1WinsBlack, team1WinsYellow) {
    return team1WinsBlack + team1WinsYellow;
  },

  /* jshint ignore:start */
  @alias('team2Wins') team1Losses,
  @alias('team1Wins') team2Losses,
  @equal('winner', 'team1') team1IsWinner,
  @equal('winner', 'team2') team2IsWinner,
  @not('time') isNotFullyCreated,
  /* jshint ignore:end */

  /* jshint ignore:start */
  @computed('team2WinsBlack', 'team2WinsYellow')
  /* jshint ignore:end */
  team2Wins(team2WinsBlack, team2WinsYellow) {
    return team2WinsBlack + team2WinsYellow;
  },

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
  winningTeamBlackWins(winner) {
    return get(this, `${winner}WinsBlack`);
  },

  /* jshint ignore:start */
  @computed('winner')
  /* jshint ignore:end */
  winningTeamYellowWins(winner) {
    return get(this, `${winner}WinsYellow`);
  },

  /* jshint ignore:start */
  @computed('winningTeamYellowWins', 'winningTeamBlackWins')
  /* jshint ignore:end */
  winningTeamWins(winningTeamYellowWins, winningTeamBlackWins) {
    return winningTeamYellowWins + winningTeamBlackWins;
  },

  /* jshint ignore:start */
  @computed('winner')
  /* jshint ignore:end */
  losingTeamBlackWins(winner) {
    let team = winner === 'team1' ? 'team2' : 'team1';

    return get(this, `${team}WinsBlack`);
  },

  /* jshint ignore:start */
  @computed('winner')
  /* jshint ignore:end */
  losingTeamYellowWins(winner) {
    let team = winner === 'team1' ? 'team2' : 'team1';

    return get(this, `${team}WinsYellow`);
  },

  /* jshint ignore:start */
  @computed('losingTeamYellowWins', 'losingTeamBlackWins')
  /* jshint ignore:end */
  losingTeamWins(losingTeamYellowWins, losingTeamBlackWins) {
    return losingTeamYellowWins + losingTeamBlackWins;
  }
});
