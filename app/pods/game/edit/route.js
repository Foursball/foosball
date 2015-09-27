import Ember from 'ember';
import moment from 'moment';

const { Route, set, get } = Ember;

export default Route.extend({
  actions: {
    saveGame(game) {
      let t1bw = get(game, 'team1WinsBlack');
      let t1yw = get(game, 'team1WinsYellow');
      let t2bw = get(game, 'team2WinsBlack');
      let t2yw = get(game, 'team2WinsYellow');

      if (!t1bw) {
        set(game, 'team1WinsBlack', 0);
      }

      if (!t1yw) {
        set(game, 'team1WinsYellow', 0);
      }

      if (!t2bw) {
        set(game, 'team2WinsBlack', 0);
      }

      if (!t2yw) {
        set(game, 'team2WinsYellow', 0);
      }
      
      set(game, 'time', moment());

      game
        .save()
        .then(() => this.transitionTo('games'));
    }
  }
});
