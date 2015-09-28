import Ember from 'ember';

const { Route, get, setProperties, RSVP } = Ember;

export default Route.extend({
  actions: {
    startGame(game) {
      function getTeam(teams, players) {
        let [p1, p2] = players;
        let p1Id = get(p1, 'id');
        let p2Id = get(p2, 'id');
        let foundTeam = teams.find((t) => {
          let player1Id = get(t, 'player1.id');
          let player2Id = get(t, 'player2.id');

          return (player1Id === p1Id || player2Id === p1Id) &&
            (player1Id === p2Id || player2Id === p2Id);
        });

        if (foundTeam) {
          return RSVP.resolve(foundTeam);
        } else {
          return this.store.createRecord('team', {
            player1: p1,
            player2: p2
          }).save();
        }
      }

      let c = get(this, 'controller');
      let t1p1 = get(c, 'team1Player1');
      let t1p2 = get(c, 'team1Player2');
      let t2p1 = get(c, 'team2Player1');
      let t2p2 = get(c, 'team2Player2');
      let players = [[t1p1, t1p2], [t2p1, t2p2]];
      let teamsPromise = this.store.query('team', {});
      let promises = [];

      teamsPromise.then((teams) => {
        promises = players.map(getTeam.bind(this, teams));

        RSVP.all(promises).then((teams) => {
          let [team1, team2] = teams;
          setProperties(game, {
            team1,
            team2
          });

          game
            .save()
            .then(() => {
              this.transitionTo('game.edit');
            });
        });
      });
    }
  }
});
