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
  selectedSeason: null,

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

    save(model) {
      let notify = get(this, 'notify');
      let modelType = model.constructor.modelName;
      let selectedLeague = get(this, 'selectedLeague');

      if (modelType === 'foosballer') {
        if (get(model, 'isNew')) {
          let name = get(model, 'name').toLowerCase();

          set(model, 'id', name.dasherize());
        }
      } else {
        selectedLeague.get('seasons').pushObject(model);
      }

      model
        .save()
        .then((model) => notify.success(`${modelType.capitalize()} Saved`))
        .then(() => selectedLeague.save())
        .catch((e) => notify.error('Unable to save'));
    },

    cancel(model) {
      let modelType = model.constructor.modelName;
      let selected;

      if (modelType === 'season') {
        selected = get(this, 'selectedSeason');
      } else if (modelType === 'foosballer') {
        selected = get(this, 'selectedFoosballer');
      }

      selected.rollbackAttributes();
    },

    newFoosballer() {
      let selectedLeague = get(this, 'selectedLeague');
      let dialogsService = get(this, 'dialogsService');
      let newFoosballer = this.store.createRecord('foosballer', {
        league: selectedLeague
      });

      set(this, 'selectedFoosballer', newFoosballer);
      dialogsService.toggleDialog('editFoosballer');
    },

    newSeason() {
      let selectedLeague = get(this, 'selectedLeague');
      let dialogsService = get(this, 'dialogsService');
      let newSeason = this.store.createRecord('season', {
        league: selectedLeague
      });

      set(this, 'selectedSeason', newSeason);
      dialogsService.toggleDialog('editSeason');
    },

    editSeason(season) {
      let dialogsService = get(this, 'dialogsService');

      set(this, 'selectedSeason', season);
      dialogsService.toggleDialog('editSeason');
    },
  }
});
