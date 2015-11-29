import Ember from 'ember';
import PaperItemExpandMixin from 'foosball/mixins/paper-item-expand';

const { Component, computed } = Ember;

export default Component.extend(PaperItemExpandMixin, {
  tagName: '',

  itemId: computed.alias('game.id')
});
