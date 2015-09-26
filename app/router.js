import Ember from 'ember';
import config from './config/environment';

let Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('foosballers', { path: 'f' });
  this.route('teams', { path: 't' });
  this.route('team', { path: 't/:team_id' });
  this.route('games', { path: 'g' });
  this.route('game', { path: 'g/:game_id' });
});

export default Router;
