import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    return this.store.filter('game', { orderBy: 'time' }, () => true);
  }

  // afterModel(games) {
  //   let promises = [];
  //   const { store } = this;
  //
  //   games.forEach((game) => {
  //     promises.push(store.filter('team', { id: get(game, 'team1.id') }, () => true));
  //     promises.push(store.filter('team', { id: get(game, 'team2.id') }, () => true));
  //   });
  //
  //   return RSVP.all(promises)
  //     .then((teams) => {
  //       let promises = [];
  //       teams.forEach((team) => {
  //         promises.push(store.filter('foosballer', {id: get(team, 'player1.id')}, () => true));
  //         promises.push(store.filter('foosballer', {id: get(team, 'player2.id')}, () => true));
  //       });
  //
  //       return RSVP.all(promises);
  //     });
  // }
});
