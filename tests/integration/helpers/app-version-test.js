import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('Integration | Helper | {{app-version}}', {
  integration: true
});

test('it displays only app version', function(assert) {
  this.render(hbs`{{app-version hideSha=true}}`);

  assert.ok(this.$().text().match(/\d[.]\d[.]\d/), 'Displays version.');
  assert.ok(!this.$().text().match(/[a-z\d]{8}/), 'Does not display git sha.');
});

test('it displays only git sha', function(assert) {
  this.render(hbs`{{app-version hideVersion=true}}`);

  assert.ok(this.$().text().match(/[a-z\d]{8}/), 'Displays git sha.');
  assert.ok(!this.$().text().match(/\d[.]\d[.]\d/), 'Does not display version.');
});
