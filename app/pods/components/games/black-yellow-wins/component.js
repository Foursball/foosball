import Ember from 'ember';
import moment from 'moment';
import DarkUnicaTheme from 'foosball/highchart-themes/dark-unica';

const { Component, computed, set, get } = Ember;

export default Component.extend({
  games: [],

  theme: DarkUnicaTheme,

  chartOptions: {
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

  graphData: computed('games.[]', function() {
    let games = get(this, 'games');

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
        data: seriesObj.black
      }, {
        name: 'yellow',
        data: seriesObj.yellow
      }, {
        name: 'black - accumulated',
        data: this.accumulate(seriesObj.black)
      }, {
        name: 'yellow - accumulated',
        data: this.accumulate(seriesObj.yellow)
      }
    ];
  }),

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
