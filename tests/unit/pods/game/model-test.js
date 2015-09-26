import { moduleForModel, test } from 'ember-qunit';

moduleForModel('game', 'Unit | Model | game', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
