import config from 'dummy/config/environment';
import { module, test } from 'qunit';

module('App Version', function () {
  test('version is available in config', function (assert) {
    assert.ok(config['ember-cli-app-version'].appVersion);
  });
});
