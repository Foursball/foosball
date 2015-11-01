import Ember from 'ember';

const { Mixin, computed, get } = Ember;

export default Mixin.create({
  expandedId: null,

  shouldExpand: computed('itemId', 'expandedId', function() {
    return get(this, 'itemId') === get(this, 'expandedId');
  })
});
