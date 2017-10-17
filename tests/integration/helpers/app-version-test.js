import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { shaRegExp, versionRegExp, dateRegExp } from 'ember-cli-app-version/utils/regexp';

moduleForComponent('Integration | Helper | {{app-version}}', {
  integration: true
});

test('it displays only app version', function(assert) {
  assert.expect(3);

  this.render(hbs`{{app-version hideSha=true}}`);

  assert.ok(this.$().text().match(versionRegExp), 'Displays version.');
  assert.notOk(this.$().text().match(shaRegExp), 'Does not display git sha.');
  assert.notOk(this.$().text().match(dateRegExp), 'Does not display git date.');
});

test('it displays only git sha', function(assert) {
  assert.expect(3);

  this.render(hbs`{{app-version hideVersion=true}}`);

  assert.ok(this.$().text().match(shaRegExp), 'Displays git sha.');
  assert.notOk(this.$().text().match(versionRegExp), 'Does not display version.');
  assert.notOk(this.$().text().match(dateRegExp), 'Does not display git date.');
});

test('it displays only git date', function(assert) {
  assert.expect(3);

  this.render(hbs`{{app-version hideSha=true hideVersion=true showDate=true}}`);

  assert.ok(this.$().text().match(dateRegExp), 'Displays git date.');
  assert.notOk(this.$().text().match(shaRegExp), 'Does not display git sha.');
  assert.notOk(this.$().text().match(versionRegExp), 'Does not display version.');
});
