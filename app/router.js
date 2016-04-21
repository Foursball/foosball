import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('foosballers', { path: 'f' });
  this.route('teams', { path: 't' });
  this.route('games', { path: 'g' });
  this.route('game', { path: 'g/:game_id' }, function() {
    this.route('new', { path: 'n' });
    this.route('edit', { path: 'e' });
  });
  this.route('summary');
  this.route('loading');
  this.route('something-happened');
  this.route('login');
  this.route('home');
});

export default Router;
