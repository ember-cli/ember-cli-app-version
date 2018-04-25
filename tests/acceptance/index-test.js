import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import config from 'dummy/config/environment';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');

    assert.ok(config.APP.version, 'app version is present');

    assert.equal(document.querySelector('p.message').textContent, `Your app version is ${config.APP.version}`);
  });
});
