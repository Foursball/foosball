import Ember from 'ember';
import PaperItemExpandMixin from 'foosball/mixins/paper-item-expand';
import DarkUnicaTheme from 'foosball/highchart-themes/dark-unica';
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
  teamDecorator: inject.service(),
  gamesService: inject.service('games'),

  tagName: '',

  // Decorated team produced from the team-decorator service
  decoratedTeam: null,

  /* jshint ignore:start */
  @alias('decoratedTeam.team.id') itemId,
  /* jshint ignore:end */

  /* jshint ignore:start */
  @computed
  /* jshint ignore:end */
  games() {
    return get(this, 'store').peekAll('game');
  },

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

  /* jshint ignore:start */
  @computed('games.[]', 'decoratedTeam')
  /* jshint ignore:end */
  graphData(games, decoratedTeam) {
    let teamDecorator = get(this, 'teamDecorator');
    let team = get(decoratedTeam, 'team');
    let gamesService = get(this, 'gamesService');
    let gamesTeamPlayedIn = gamesService.gamesTeamPlayedIn(team, games);
    let gamesByWeek = gamesService.gamesByWeek(gamesTeamPlayedIn);
    let winLossRatioByTimePeriod = teamDecorator.winLossRatioByTimePeriod(team, gamesByWeek);
    let cumulativeWinLoss = teamDecorator.cumulativeWinLossByTimePeriod(team, gamesByWeek);

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
