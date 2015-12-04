import Ember from 'ember';
import PaperItemExpandMixin from 'foosball/mixins/paper-item-expand';
import { alias } from 'ember-computed-decorators';

const { Component } = Ember;

export default Component.extend(PaperItemExpandMixin, {
  tagName: '',

  // Decorated team produced from the team-decorator service
  decoratedTeam: null,

  /* jshint ignore:start */
  @alias('decoratedTeam.team.id') itemId
  /* jshint ignore:end */
});
