import Ember from 'ember';
import moment from 'moment';
import DarkUnicaTheme from 'foosball/highchart-themes/dark-unica';
import computed from 'ember-computed-decorators';

const { Component, set, get } = Ember;

export default Component.extend({
  games: [],

  theme: DarkUnicaTheme,

  calculateWidth: function() {
    // this seems like it could be unreliable :/
    let $width = this.$().parent().width();

    set(this, 'chartOptions.chart.width', $width);
  }.on('didInsertElement'),

  chartOptions: {
    chart: {},
    title: {
      text: 'Black and Yellow Wins'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      type: 'logarithmic',
      minorTickInterval: 0.1,
      min: 1,
      title: {
        text: 'Games'
      }
    }
  },

  /* jshint ignore:start */
  @computed('games.[]')
  /* jshint ignore:end */
  graphData(games) {
    let gamesDayObj = games.reduce((prev, game) => {
      let day = moment(new Date(get(game, 'time'))).startOf('day').valueOf().toString();
      let blackWins = get(game, 'blackWins');
      let yellowWins = get(game, 'yellowWins');
      let prevObj = get(prev, day);

      if (!prevObj) {
        set(prev, day, {
          black: {
            x: day,
            y: blackWins
          },
          yellow: {
            x: day,
            y: yellowWins
          }
        });
      } else {
        let prevBlackWins = get(prevObj, `black.y`);
        let prevYellowWins = get(prevObj, `yellow.y`);

        set(prev, day, {
          black: {
            x: day,
            y: prevBlackWins + blackWins
          },
          yellow: {
            x: day,
            y: prevYellowWins + yellowWins
          }
        });
      }

      return prev;
    }, {});

    let seriesObj = Object.keys(gamesDayObj).reduce((prev, gameDay) => {
      prev.black.push({ x: parseInt(gameDay, 10), y: get(gamesDayObj, `${gameDay}.black.y`) });
      prev.yellow.push({ x: parseInt(gameDay, 10), y: get(gamesDayObj, `${gameDay}.yellow.y`) });

      return prev;
    }, { black: [], yellow: [] });

    return [
      {
        name: 'black',
        data: seriesObj.black,
        color: '#009688'
      }, {
        name: 'yellow',
        data: seriesObj.yellow,
        color: '#FFEB3B'
      }, {
        name: 'black - accumulated',
        data: this.accumulate(seriesObj.black),
        color: '#00BFA5'
      }, {
        name: 'yellow - accumulated',
        data: this.accumulate(seriesObj.yellow),
        color: '#FFD600'
      }
    ];
  },

  accumulate(series) {
    let accumulatedSeries = [];

    for (let i = 0; i < series.length; i++) {
      if (i) {
        accumulatedSeries.push({ x: series[i].x, y: accumulatedSeries[i - 1].y + series[i].y });
      } else {
        accumulatedSeries[0] = { x: series[0].x, y: series[0].y };
      }
    }

    return accumulatedSeries;
  }
});
