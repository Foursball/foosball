import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('foosballers-sorter', 'Integration | Component | foosballers sorter', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{foosballers-sorter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#foosballers-sorter}}
      template block text
    {{/foosballers-sorter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
