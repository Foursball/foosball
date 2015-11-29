import Ember from 'ember';
import PaperItemExpandMixin from 'foosball/mixins/paper-item-expand';

const { Component, computed } = Ember;

export default Component.extend(PaperItemExpandMixin, {
  tagName: '',

  // Decorated team produced from the team-decorator service
  decoratedTeam: null,

  itemId: computed.alias('decoratedTeam.team.id')
});
