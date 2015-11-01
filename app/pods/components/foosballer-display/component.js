import Ember from 'ember';
import PaperItemExpandMixin from 'foosball/mixins/paper-item-expand';

const { Component, computed } = Ember;

export default Component.extend(PaperItemExpandMixin, {
  // Decorated foosballer produced from the foosballer-decorator service
  decoratedFoosballer: null,

  itemId: computed.alias('decoratedFoosballer.foosballer.id')
});
