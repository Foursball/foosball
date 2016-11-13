import Ember from 'ember';
import computed from 'ember-computed-decorators';

const {
  Controller,
  inject: { service },
  set,
  get
} = Ember;

export default Controller.extend({
  queryParams: ['section'],

  dialogsService: service('dialogs'),
  notify: service(),

  section: 'players',

  selectedLeague: null,
  selectedFoosballer: null,

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end*/
  foosballers() {
    return this.store.peekAll('foosballer');
  },

  /* jshint ignore:start */
  @computed()
  /* jshint ignore:end*/
  leagues() {
    return this.store.peekAll('league');
  },

  actions: {
    editFoosballer(foosballer) {
      let dialogsService = get(this, 'dialogsService');

      set(this, 'selectedFoosballer', foosballer);
      dialogsService.toggleDialog('editFoosballer');
    },

    saveFoosballer(foosballer) {
      let notify = get(this, 'notify');

      if (get(foosballer, 'isNew')) {
        let name = get(foosballer, 'name').toLowerCase();

        set(foosballer, 'id', name.dasherize());
      }

      foosballer
        .save()
        .then((foosballer) => notify.success('Player saved'))
        .catch((e) => notify.error('Unable to save'));
    },

    cancelFoosballer(foosballer) {
      let selectedFoosballer = get(this, 'selectedFoosballer');

      selectedFoosballer.rollbackAttributes();
    },

    newFoosballer() {
      let selectedLeague = get(this, 'selectedLeague');
      let dialogsService = get(this, 'dialogsService');
      let newFoosballer = this.store.createRecord('foosballer', {
        league: selectedLeague
      });

      set(this, 'selectedFoosballer', newFoosballer);
      dialogsService.toggleDialog('editFoosballer');
    }
  }
});
