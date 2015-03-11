import config from 'dummy/config/environment';
import { module, test } from 'qunit';

module('App Version');

test('version is available in config', function(assert){
  assert.ok(config.APP.version);
});
