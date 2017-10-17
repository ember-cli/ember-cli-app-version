import { appVersion } from 'dummy/helpers/app-version';
import { module, test } from 'qunit';
import config from 'dummy/config/environment';

const {
  APP: {
    version
  }
} = config;

module('Unit | Helper | app version');

test('it returns app version', function(assert) {
  assert.expect(1);

  let result = appVersion();

  assert.equal(result, version, 'Returns app version.');
});

test('it returns only app version', function(assert) {
  assert.expect(1);

  let result = appVersion([], { hideSha: true, hideDate: true });

  assert.equal(result, version.split('+')[0], 'Returns app version without git sha.');
});

test('it returns only git sha', function(assert) {
  assert.expect(1);

  let result = appVersion([], { hideVersion: true, hideDate: true });

  assert.equal(result, version.split('+')[1].substring(0, 8), 'Returns git sha without app version.');
});

test('it returns only git date', function(assert) {
  assert.expect(1);

  let result = appVersion([], { hideVersion: true, hideSha: true });

  assert.equal(result, version.split(' ')[1], 'Returns git date without app version.');
});
