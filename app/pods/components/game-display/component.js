import Ember from 'ember';
import PaperItemExpandMixin from 'foosball/mixins/paper-item-expand';
import { alias } from 'ember-computed-decorators';

const { Component } = Ember;

export default Component.extend(PaperItemExpandMixin, {
  tagName: '',

  /* jshint ignore:start */
  @alias('game.id') itemId
  /* jshint ignore:end */
});
