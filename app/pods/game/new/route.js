import Ember from 'ember';

const { Route, get, setProperties, RSVP, inject: { service } } = Ember;

export default Route.extend({
  teamService: service('team-decorator'),

  afterModel() {
    const { store } = this;
    let promises = [
      this.store.findAll('foosballer'),
      this.store.findAll('team'),
      this.store.findAll('game')
    ];

    return RSVP.all(promises);
  },

  setupController(controller, model) {
    this._super(...arguments);

    setProperties(controller, {
      team1Player1: null,
      team1Player2: null,
      team2Player1: null,
      team2Player2: null
    });
  },

  actions: {
    startGame(game) {
      let teamService = get(this, 'teamService');
      const { store } = this;
      let teams = store.peekAll('team');
      let c = get(this, 'controller');
      let t1p1 = get(c, 'team1Player1');
      let t1p2 = get(c, 'team1Player2');
      let t2p1 = get(c, 'team2Player1');
      let t2p2 = get(c, 'team2Player2');
      let players = [[t1p1, t1p2], [t2p1, t2p2]];
      let promises = [];

      function getTeam(players) {
        let [p1, p2] = players;
        let p1Id = get(p1, 'id');
        let p2Id = get(p2, 'id');
        let foundTeam = teamService.getTeam(teams, p1Id, p2Id);

        if (foundTeam) {
          return RSVP.resolve(foundTeam);
        } else {
          return store.createRecord('team', {
            player1: p1,
            player2: p2
          }).save();
        }
      }

      promises = players.map(getTeam);

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
    }
  }
});
