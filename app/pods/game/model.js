import DS from 'ember-data';
import Ember from 'ember';

const { computed, get } = Ember;

export default DS.Model.extend({
  team1: DS.belongsTo('team', { async: true }),
  team2: DS.belongsTo('team', { async: true }),
  team1WinsBlack: DS.attr('number'),
  team1WinsYellow: DS.attr('number'),
  team2WinsBlack: DS.attr('number'),
  team2WinsYellow: DS.attr('number'),
  time: DS.attr('string'),

  team1Wins: computed('team1WinsBlack', 'team1WinsYellow', function() {
    return get(this, 'team1WinsBlack') + get(this, 'team1WinsYellow');
  }),

  team2Wins: computed('team2WinsBlack', 'team2WinsYellow', function() {
    return get(this, 'team2WinsBlack') + get(this, 'team2WinsYellow');
  }),

  winner: computed('team1Wins', 'team2Wins', function() {
    let team1Wins = get(this, 'team1Wins');
    let team2Wins = get(this, 'team2Wins');

    return team1Wins > team2Wins ? 'team1' : 'team2';
  }),

  team1IsWinner: computed.equal('winner', 'team1'),
  team2IsWinner: computed.equal('winner', 'team2'),

  winningTeam: computed('team1IsWinner', function() {
    let team1IsWinner = get(this, 'team1IsWinner');

    return team1IsWinner ? get(this, 'team1') : get(this, 'team2');
  }),

  losingTeam: computed('team1IsWinner', function() {
    let team1IsWinner = get(this, 'team1IsWinner');

    return team1IsWinner ? get(this, 'team2') : get(this, 'team1');
  }),

  winningTeamBlackWins: computed('winner', function() {
    let winner = get(this, 'winner');

    return get(this, `${winner}WinsBlack`);
  }),

  winningTeamYellowWins: computed('winner', function() {
    let winner = get(this, 'winner');

    return get(this, `${winner}WinsYellow`);
  }),

  losingTeamBlackWins: computed('winner', function() {
    let winner = get(this, 'winner');
    let team = winner === 'team1' ? 'team2' : 'team1';

    return get(this, `${team}WinsBlack`);
  }),

  losingTeamYellowWins: computed('winner', function() {
    let winner = get(this, 'winner');
    let team = winner === 'team1' ? 'team2' : 'team1';

    return get(this, `${team}WinsYellow`);
  })
});