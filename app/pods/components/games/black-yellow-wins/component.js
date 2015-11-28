import Ember from 'ember';
import moment from 'moment';
import DarkUnicaTheme from 'foosball/highchart-themes/dark-unica';

const { Component, computed, set, get } = Ember;

export default Component.extend({
  games: [],

  accumulate: false,

  theme: DarkUnicaTheme,

  chartOptions: {
    title: {
      text: 'Black and Yellow Wins'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'Games'
      }
    }
  },

  chartOptionsAccumulated: {
    title: {
      text: 'Black and Yellow Wins Accumulated'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
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
      }
    ];
  }),

  graphDataAccumulated: computed('graphData', function() {
    let graphData = get(this, 'graphData');
    let stackedObj = [
      {
        name: 'black',
        data: []
      }, {
        name: 'yellow',
        data: []
      }
    ];
    let blackSeries = graphData[0].data;
    let yellowSeries = graphData[1].data;
    let stackedBlackSeries = stackedObj[0].data;
    let stackedYellowSeries = stackedObj[1].data;

    for (let i = 0; i < blackSeries.length; i++) {
      if (i) {
        stackedBlackSeries.push({ x: blackSeries[i].x, y: stackedBlackSeries[i - 1].y + blackSeries[i].y });
      } else {
        stackedBlackSeries[0] = { x: blackSeries[0].x, y: blackSeries[0].y };
      }
    }

    for (let i = 0; i < yellowSeries.length; i++) {
      if (i) {
        stackedYellowSeries.push({ x: yellowSeries[i].x, y: stackedYellowSeries[i - 1].y + yellowSeries[i].y });
      } else {
        stackedYellowSeries[0] = { x: yellowSeries[0].x, y: yellowSeries[0].y };
      }
    }

    return stackedObj;
  })
});
