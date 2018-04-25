import { module, test } from 'qunit';
import { shaRegExp, versionRegExp } from 'ember-cli-app-version/utils/regexp';

module('Unit | Utility | regexp');

test('version reg ex matches expected strings', function(assert) {
  assert.expect(6);

  assert.ok('2.0.1'.match(versionRegExp), 'Matches expected pattern.');
  assert.ok('2018.01.01.1500'.match(versionRegExp), 'Matches multiple dot separated groups of numbers.');
  assert.ok(!'01'.match(versionRegExp), 'Does not match numbers without a dot.');
  assert.ok(!'11.b.12'.match(versionRegExp), 'Does not match alternating numbers and letters.');
  assert.ok(!'a.b.c'.match(versionRegExp), 'Does not match letters.');
  assert.ok(!'git12sha'.match(versionRegExp), 'Does not match sha.');
});

test('git sha reg ex matches expected strings', function(assert) {
  assert.expect(2);

  assert.ok('git12sha'.match(shaRegExp), 'Matches expected pattern.');
  assert.ok(!'2.0.1'.match(shaRegExp), 'Does not match version pattern.');
});
