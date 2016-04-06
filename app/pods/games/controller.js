import Ember from 'ember';
import computed from 'ember-computed-decorators';

const {
  Controller,
  get,
  set,
  PromiseProxyMixin,
  ObjectProxy,
  RSVP: {
    Promise
  }
} = Ember;

const ObjectPromiseProxy = ObjectProxy.extend(PromiseProxyMixin);

export default Controller.extend({
  queryParams: ['expandedId'],

  @computed('model.[]')
  calculation(games) {
    let worker = new Worker('workers/team-vs-team.js');
    worker.postMessage(JSON.stringify(games.toArray()));

    return ObjectPromiseProxy.create({
      promise: new Promise((resolve, reject) => {
        worker.onmessage = function(event) {
          resolve(event.data);
        };
      })
    });
  },

  /* jshint ignore:start */
  @computed('model.[]')
  /* jshint ignore:end */
  legitGames(games) {
    return games.filter((g) => get(g, 'time'));
  },

  /* jshint ignore:start */
  @computed('legitGames')
  /* jshint ignore:end */
  sortedGames(legitGames) {
    return legitGames.toArray().sort((a, b) => {
      a = new Date(get(a, 'time')).getTime();
      b = new Date(get(b, 'time')).getTime();

      return a > b ? -1 : a === b ? 0 : 1;
    });
  },

  actions: {
    expandGame(game) {
      set(this, 'expandedId', game.id);
    }
  }
});
