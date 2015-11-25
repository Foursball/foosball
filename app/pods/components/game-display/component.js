import Ember from 'ember';
import PaperItemExpandMixin from 'foosball/mixins/paper-item-expand';

const { Component, computed } = Ember;

export default Component.extend(PaperItemExpandMixin, {

  itemId: computed.alias('game.id')
});
