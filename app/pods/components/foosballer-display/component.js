import Ember from 'ember';
import PaperItemExpandMixin from 'foosball/mixins/paper-item-expand';
import DarkUnicaTheme from 'foosball/highchart-themes/dark-unica';

const { Component, computed, inject, get } = Ember;

export default Component.extend(PaperItemExpandMixin, {
  store: inject.service(),
  foosballerDecorator: inject.service(),
  gamesService: inject.service('games'),

  tagName: '',

  // Decorated foosballer produced from the foosballer-decorator service
  decoratedFoosballer: null,

  itemId: computed.alias('decoratedFoosballer.foosballer.id'),

  games: computed(function() {
    return get(this, 'store').peekAll('game');
  }),

  theme: DarkUnicaTheme,

  chartOptions: {
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'Win/Loss Ratio'
      }
    }
  },

  graphData: computed('games.[]', 'decoratedFoosballer', function() {
    let foosballerDecorator = get(this, 'foosballerDecorator');
    let foosballer = get(this, 'decoratedFoosballer.foosballer');
    let games = get(this, 'games');
    let gamesService = get(this, 'gamesService');
    let gamesPlayedIn = gamesService.gamesPlayedIn(foosballer, games);
    let gamesByWeek = gamesService.gamesByWeek(gamesPlayedIn);
    let winLossRatioByTimePeriod = foosballerDecorator.winLossRatioByTimePeriod(foosballer, gamesByWeek);

    return [
      {
        name: 'win/loss',
        data: Object.keys(winLossRatioByTimePeriod).map((time) => {
          return { x: parseInt(time, 10), y: get(winLossRatioByTimePeriod, time) };
        })
      }
    ];
  })
});
