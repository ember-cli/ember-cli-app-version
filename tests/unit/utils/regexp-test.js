import { module, test } from 'qunit';
import { shaRegExp, versionRegExp, versionExtendedRegExp } from 'ember-cli-app-version/utils/regexp';

module('Unit | Utility | regexp');

test('version reg ex matches expected strings', function(assert) {
  assert.expect(4);

  assert.ok('2.0.1'.match(versionRegExp), 'Matches expected pattern.');
  assert.ok('2.20.1'.match(versionRegExp), 'Matches expected pattern.');
  assert.ok(!'a.b.c'.match(versionRegExp), 'Does not match letters.');
  assert.ok(!'git12sha'.match(versionRegExp), 'Does not match sha.');
});

test('version extended reg ex matches expected strings', function(assert) {
  assert.expect(6);

  assert.ok('2.0.1-alpha'.match(versionRegExp), 'Matches expected pattern.');
  assert.ok('2.20.1-alpha.15'.match(versionRegExp), 'Matches expected pattern.');
  assert.ok(!'1.1.1-alpha.'.match(versionRegExp), 'Does not match hanging period.');
  assert.ok(!'1.1.1-alpha.abc'.match(versionRegExp), 'Does not match letters after extended tag period.');
  assert.ok(!'a.b.c-alpha.15'.match(versionRegExp), 'Does not match letters.');
  assert.ok(!'git12sha'.match(versionRegExp), 'Does not match sha.');
});

test('git sha reg ex matches expected strings', function(assert) {
  assert.expect(4);

  assert.ok('git12sha'.match(shaRegExp), 'Matches expected pattern.');
  assert.ok(!'2.0.1'.match(shaRegExp), 'Does not match version pattern.');
  assert.ok(!'2.0.1-alpha.15'.match(shaRegExp), 'Does not match version extended pattern.');
  assert.ok(!'2.0.1-alphaabc.15'.match(shaRegExp), 'Does not match version extended pattern (with 8 chars in tag name).');
});
