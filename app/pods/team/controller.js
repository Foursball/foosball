import Ember from 'ember';

const { Controller, computed, inject, get } = Ember;

export default Controller.extend({
  teamDecorator: inject.service(),

  games: computed(function() {
    return this.store.findAll('game');
  }),

  team: computed('model', 'games.[]', function() {
    let model = get(this, 'model');
    let games = get(this, 'games');
    let teamDecorator = get(this, 'teamDecorator');

    return get(teamDecorator.decorate([model], games), 'firstObject');
  })
});
