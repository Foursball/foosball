import Ember from 'ember';
import computed from 'ember-computed-decorators';
import moment from 'moment';

const {
  Controller,
  inject: { service },
  set,
  get,
  RSVP
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

  saveFoosballer(foosballer, league) {
    let notify = get(this, 'notify');

    if (get(foosballer, 'isNew')) {
      let name = get(foosballer, 'name').toLowerCase();

      set(foosballer, 'id', name.dasherize());
      league.get('foosballers').addObject(foosballer);
    }

    return foosballer
      .save()
      .then((foosballer) => notify.success(`Player Saved`))
      .then(() => league.save())
      .catch((e) => notify.error('Unable to save'));
  },

  saveSeason(season, league) {
    let notify = get(this, 'notify');

    league.get('seasons').addObject(season);

    return season
      .save()
      .then((season) => notify.success('Season Saved'))
      .then(() => league.save())
      .catch((e) => notify.error('Unable to save'));
  },

  saveLeague(league) {
    let notify = get(this, 'notify');
    let isNew = get(league, 'isNew');

    return league
      .save()
      .then((league) => {
        if (isNew) {
          let now = moment();
          let defaultSeason = this.store.createRecord('season', {
            name: 'Season 1',
            startTime: now.valueOf(),
            endTime: now.add(3, 'months').valueOf(),
            isActive: true
          });

          return this.saveSeason(defaultSeason, league);
        } else {
          return new RSVP.resolve();
        }
      })
      .then(() => notify.success('League Saved'))
      .catch((e) => notify.error('Unable to save'));
  },

  actions: {
    editFoosballer(foosballer) {
      let dialogsService = get(this, 'dialogsService');

      set(this, 'selectedFoosballer', foosballer);
      dialogsService.toggleDialog('editFoosballer');
    },

    save(model) {
      let modelType = model.constructor.modelName;
      let selectedLeague = get(this, 'selectedLeague');

      if (modelType === 'foosballer') {
        return this.saveFoosballer(model, selectedLeague);
      } else if (modelType === 'season') {
        return this.saveSeason(model, selectedLeague);
      } else if (modelType === 'league') {
        return this.saveLeague(model);
      }
    },

    cancel(model) {
      let modelType = model.constructor.modelName;
      let selected;

      if (modelType === 'season') {
        selected = get(this, 'selectedSeason');
      } else if (modelType === 'foosballer') {
        selected = get(this, 'selectedFoosballer');
      } else if (modelType === 'league') {
        selected = get(this, 'editingLeague');
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
        league: selectedLeague,
        startTime: Date.now(),
        endTime: Date.now()
      });

      set(newSeason, 'range', {
        start: new Date(),
        end: new Date()
      });
      set(this, 'selectedSeason', newSeason);
      dialogsService.toggleDialog('editSeason');
    },

    editSeason(season) {
      let dialogsService = get(this, 'dialogsService');
      let { startTime, endTime } = season.getProperties('startTime', 'endTime');

      set(season, 'range', {
        start: new Date(startTime),
        end: new Date(endTime)
      });
      set(this, 'selectedSeason', season);
      dialogsService.toggleDialog('editSeason');
    },

    updateRange({ date }) {
      let { end, start } = date;
      let selectedSeason = get(this, 'selectedSeason');

      selectedSeason.setProperties({
        startTime: start ? start.valueOf() : null,
        endTime: end ? end.valueOf() : null,
        'range.start': start,
        'range.end': end
      });
    },

    editLeague(league) {
      let dialogsService = get(this, 'dialogsService');

      set(this, 'editingLeague', league);
      dialogsService.toggleDialog('editLeague');
    },

    newLeague() {
      let dialogsService = get(this, 'dialogsService');
      let newLeague = this.store.createRecord('league', {});

      set(this, 'editingLeague', newLeague);
      dialogsService.toggleDialog('editLeague');
    }
  }
});
