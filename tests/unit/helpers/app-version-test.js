import { makeHelper } from 'dummy/helpers/app-version';
import { module, test } from 'qunit';

const appVersion = makeHelper('10.20.3+deadbeef');

module('Unit | Helper | app version');

test('it returns app version', function(assert) {
  assert.expect(1);

  let result = appVersion();

  assert.equal(result, '10.20.3+deadbeef', 'Returns app version.');
});

test('it returns only app version', function(assert) {
  assert.expect(1);

  let result = appVersion([], { hideSha: true });

  assert.equal(result, '10.20.3', 'Returns app version without git sha.');
});

test('it returns only git sha', function(assert) {
  assert.expect(1);

  let result = appVersion([], { hideVersion: true });

  assert.equal(result, 'deadbeef', 'Returns git sha without app version.');
});
