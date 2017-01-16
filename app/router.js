import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('foosballers', { path: 'p' });
  this.route('foosballer', { path: 'p/:foosballer_id' });
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
  this.route('home', { path: 'h' });
  this.route('about');
  this.route('league-rules');
  this.route('choose-fooser');
  this.route('logout');
  this.route('admin');
});

export default Router;
