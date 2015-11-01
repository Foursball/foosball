import Ember from 'ember';
import PaperItemExpandMixin from '../../../mixins/paper-item-expand';
import { module, test } from 'qunit';

module('Unit | Mixin | paper item expand');

// Replace this with your real tests.
test('it works', function(assert) {
  let PaperItemExpandObject = Ember.Object.extend(PaperItemExpandMixin);
  let subject = PaperItemExpandObject.create();
  assert.ok(subject);
});
