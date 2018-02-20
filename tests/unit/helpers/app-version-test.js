import { makeHelper } from 'dummy/helpers/app-version';
import { module, test } from 'qunit';

const versionOnlyString = '10.20.3';
const extendedTagOnlyString = 'alpha.15';
const shaOnlyString = 'deadb33f';

const versionString = versionOnlyString+'-'+extendedTagOnlyString+'+'+shaOnlyString;
const appVersion = makeHelper(versionString);

const standardVersionString = versionOnlyString+'+'+shaOnlyString;
const standardAppVersion = makeHelper(standardVersionString);

module('Unit | Helper | app version');

test('it returns app version', function(assert) {
  assert.expect(1);

  let result = appVersion();

  assert.equal(result, versionString, 'Returns app version.');
});

test('it returns only app version (backwards compatible)', function(assert) {
  assert.expect(1);

  let result = appVersion([], { hideSha: true });

  assert.equal(result, versionOnlyString, 'Returns app version without git sha.');
});

test('it returns only app version', function(assert) {
  assert.expect(1);

  let result = appVersion([], { versionOnly: true });

  assert.equal(result, versionOnlyString, 'Returns app version without git sha.');
});

test('it returns only app version extended', function(assert) {
  assert.expect(1);

  let result = appVersion([], { versionOnly: true, showExtended: true });

  assert.equal(result, versionOnlyString+'-'+extendedTagOnlyString, 'Returns app version extended without git sha.');
});

test('it returns only app version (falls back when no extended)', function(assert) {
  assert.expect(1);

  let result = standardAppVersion([], { versionOnly: true, showExtended: true });

  assert.equal(result, versionOnlyString, 'Returns app version without git sha.');
});

test('it returns only git sha (backwards compatible)', function(assert) {
  assert.expect(1);

  let result = appVersion([], { hideVersion: true });

  assert.equal(result, shaOnlyString, 'Returns git sha without app version.');
});

test('it returns only git sha', function(assert) {
  assert.expect(1);

  let result = appVersion([], { shaOnly: true });

  assert.equal(result, shaOnlyString, 'Returns git sha without app version.');
});
