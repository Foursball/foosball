import { moduleForModel, test } from 'ember-qunit';

moduleForModel('team', 'Unit | Model | team', {
  // Specify the other units that are required for this test.
  needs: ['model:foosballer']
});

test('it exists', function(assert) {
  let model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
