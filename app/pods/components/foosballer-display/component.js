import Ember from 'ember';
import PaperItemExpandMixin from 'foosball/mixins/paper-item-expand';
import Foursball from 'foosball/highchart-themes/foursball';
import computed, {
  alias
} from 'ember-computed-decorators';

const {
  Component,
  inject,
  get
} = Ember;

export default Component.extend(PaperItemExpandMixin, {
  store: inject.service(),
  foosballerDecorator: inject.service(),
  gamesService: inject.service('games'),

  tagName: '',

  // Decorated foosballer produced from the foosballer-decorator service
  decoratedFoosballer: null,

  /* jshint ignore:start */
  @alias('decoratedFoosballer.foosballer.id') itemId,
  /* jshint ignore:end */

  /* jshint ignore:start */
  @computed
  /* jshint ignore:end */
  games() {
    return get(this, 'store').peekAll('game');
  },

  theme: Foursball,

  chartOptions: {
    chart: {
      height: 200
    },
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

  /* jshint ignore:start */
  @computed('games.[]', 'decoratedFoosballer')
  /* jshint ignore:end */
  graphData(games, decoratedFoosballer) {
    let foosballerDecorator = get(this, 'foosballerDecorator');
    let foosballer = get(decoratedFoosballer, 'foosballer');
    let gamesService = get(this, 'gamesService');
    let gamesPlayedIn = gamesService.gamesPlayedIn(foosballer, games);
    let gamesByWeek = gamesService.gamesByWeek(gamesPlayedIn);
    let winLossRatioByTimePeriod = foosballerDecorator.winLossRatioByTimePeriod(foosballer, gamesByWeek);
    let cumulativeWinLoss = foosballerDecorator.cumulativeWinLossByTimePeriod(foosballer, gamesByWeek);

    let cumulativeWinLossRatioSeries = {
      name: 'cumulative win/loss',
      data: Object.keys(cumulativeWinLoss)
        .map((time) => {
          let {
            wins,
            losses
          } = get(cumulativeWinLoss, time);

          return {
            x: parseInt(time, 10),
            y: wins / (losses || 1)
          };
        })
    };

    let winsLossRatioSeries = {
      name: 'win/loss',
      data: Object.keys(winLossRatioByTimePeriod)
        .map((time) => {
          return {
            x: parseInt(time, 10),
            y: get(winLossRatioByTimePeriod, time)
          };
        })
    };

    return [winsLossRatioSeries, cumulativeWinLossRatioSeries];
  }
});
