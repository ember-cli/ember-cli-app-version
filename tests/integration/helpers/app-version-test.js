import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('Integration | Helper | {{app-version}}', {
  integration: true
});

test('it displays only app version', function(assert) {
  assert.expect(1);

  this.render(hbs`{{app-version hideSha=true}}`);

  assert.ok(this.$().text(), 'Version not empty');
});

test('it displays only git sha', function(assert) {
  assert.expect(1);

  this.render(hbs`{{app-version hideVersion=true}}`);

  assert.ok(this.$().text(), 'Version not empty');
});
