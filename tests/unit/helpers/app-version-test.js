import { appVersion } from 'dummy/helpers/app-version';
import { module, test } from 'qunit';
import writeMetaTag from 'ember-cli-app-version/utils/write-meta-tag';

const versionOnlyString = '10.20.3';
const extendedTagOnlyString = 'alpha.15';
const shaOnlyString = 'deadb33f';

const versionString =
  versionOnlyString + '-' + extendedTagOnlyString + '+' + shaOnlyString;
const standardVersionString = versionOnlyString + '+' + shaOnlyString;
// const oldVersion = '0.0.1';

module('Unit | Helper | app version', function (hooks) {
  hooks.beforeEach(function () {
    document.head
      .querySelectorAll(`meta[name="ember-cli-app-version"]`)
      .forEach((el) => el.remove());
  });

  test('it returns app version', function (assert) {
    assert.expect(1);
    writeMetaTag(document, versionString);

    assert.strictEqual(appVersion(), versionString, 'Returns app version.');
  });

  test('it returns only app version (backwards compatible)', function (assert) {
    assert.expect(1);

    writeMetaTag(document, versionString);
    let result = appVersion([], { hideSha: true });

    assert.strictEqual(
      result,
      versionOnlyString,
      'Returns app version without git sha.'
    );
  });

  test('it returns only app version', function (assert) {
    assert.expect(1);

    writeMetaTag(document, versionString);
    let result = appVersion([], { versionOnly: true });

    assert.strictEqual(
      result,
      versionOnlyString,
      'Returns app version without git sha.'
    );
  });

  test('it returns only app version extended', function (assert) {
    assert.expect(1);

    writeMetaTag(document, versionString);
    let result = appVersion([], { versionOnly: true, showExtended: true });

    assert.strictEqual(
      result,
      versionOnlyString + '-' + extendedTagOnlyString,
      'Returns app version extended without git sha.'
    );
  });

  test('it returns only app version (falls back when no extended)', function (assert) {
    assert.expect(1);

    writeMetaTag(document, standardVersionString);
    let result = appVersion([], { versionOnly: true, showExtended: true });

    assert.strictEqual(
      result,
      versionOnlyString,
      'Returns app version without git sha.'
    );
  });

  test('it returns only git sha (backwards compatible)', function (assert) {
    assert.expect(1);

    writeMetaTag(document, versionString);
    let result = appVersion([], { hideVersion: true });

    assert.strictEqual(
      result,
      shaOnlyString,
      'Returns git sha without app version.'
    );
  });

  test('it returns only git sha', function (assert) {
    assert.expect(1);

    writeMetaTag(document, versionString);
    let result = appVersion([], { shaOnly: true });

    assert.strictEqual(
      result,
      shaOnlyString,
      'Returns git sha without app version.'
    );
  });
});
