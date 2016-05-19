import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.authenticatedRoute('foosballers', { path: 'f' });
  this.authenticatedRoute('foosballer', { path: 'f/:foosballer_id' });
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
  this.authenticatedRoute('home');
  this.route('about');
  this.route('league-rules');
  this.authenticatedRoute('choose-fooser');
});

export default Router;
