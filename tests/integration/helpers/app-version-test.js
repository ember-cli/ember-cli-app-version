import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import regexp from 'ember-cli-app-version/utils/regexp';

const {
  shaRegExp,
  versionRegExp
} = regexp;


moduleForComponent('Integration | Helper | {{app-version}}', {
  integration: true
});

test('it displays only app version', function(assert) {
  assert.expect(2);

  this.render(hbs`{{app-version hideSha=true}}`);

  assert.ok(this.$().text().match(versionRegExp), 'Displays version.');
  assert.ok(!this.$().text().match(shaRegExp), 'Does not display git sha.');
});

test('it displays only git sha', function(assert) {
  assert.expect(2);

  this.render(hbs`{{app-version hideVersion=true}}`);

  assert.ok(this.$().text().match(shaRegExp), 'Displays git sha.');
  assert.ok(!this.$().text().match(versionRegExp), 'Does not display version.');
});
