import { module, test } from 'qunit';
import { shaRegExp, versionRegExp } from 'ember-cli-app-version/utils/regexp';

module('Unit | Utility | regexp');

test('version reg ex matches expected strings', function(assert) {
  assert.expect(3);

  assert.ok('2.0.1'.match(versionRegExp), 'Matches expected pattern.');
  assert.ok(!'a.b.c'.match(versionRegExp), 'Does not match letters.');
  assert.ok(!'git12sha'.match(versionRegExp), 'Does not match sha.');
});

test('git sha reg ex matches expected strings', function(assert) {
  assert.expect(2);

  assert.ok('git12sha'.match(shaRegExp), 'Matches expected pattern.');
  assert.ok(!'2.0.1'.match(shaRegExp), 'Does not match version pattern.');
});
