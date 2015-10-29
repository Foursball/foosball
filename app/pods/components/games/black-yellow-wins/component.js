import Ember from 'ember';
import moment from 'moment';

const { Component, computed, set, get } = Ember;

export default Component.extend({
  games: [],

  accumulate: false,

  graphData: computed('games.[]', function() {
    let games = get(this, 'games');

    let gamesDayObj = games.reduce((prev, game) => {
      let day = moment(get(game, 'time')).startOf('day').valueOf().toString();
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

    for (let i = 0; i < seriesObj.black.length; i++) {
      if (i) {
        seriesObj.black[i].stacked = seriesObj.black[i - 1].stacked + seriesObj.black[i].y;
      } else {
        seriesObj.black[i].stacked = seriesObj.black[i].y;
      }
    }

    for (let i = 0; i < seriesObj.yellow.length; i++) {
      if (i) {
        seriesObj.yellow[i].stacked = seriesObj.yellow[i - 1].stacked + seriesObj.yellow[i].y;
      } else {
        seriesObj.yellow[i].stacked = seriesObj.yellow[i].y;
      }
    }

    return seriesObj;
  })
});
