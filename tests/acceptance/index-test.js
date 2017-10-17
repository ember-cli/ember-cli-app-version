import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import config from 'dummy/config/environment';

moduleForAcceptance('Acceptance | index');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');

    assert.ok(config.APP.version, 'app version is present');

    assert.equal(find('.message').text(), `Your app version is ${config.APP.version}`);
  });
});
