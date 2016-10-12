import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.authenticatedRoute('foosballers', { path: 'p' });
  this.authenticatedRoute('foosballer', { path: 'p/:foosballer_id' });
  this.authenticatedRoute('teams', { path: 't' });
  this.authenticatedRoute('games', { path: 'g' });
  this.authenticatedRoute('game', { path: 'g/:game_id' }, function() {
    this.route('new', { path: 'n' });
    this.route('edit', { path: 'e' });
  });
  this.authenticatedRoute('summary');
  this.route('loading');
  this.route('something-happened');
  this.route('login');
  this.authenticatedRoute('home', { path: 'h' });
  this.route('about');
  this.route('league-rules');
  this.authenticatedRoute('choose-fooser');
  this.route('logout');
  this.authenticatedRoute('admin');
});

export default Router;
