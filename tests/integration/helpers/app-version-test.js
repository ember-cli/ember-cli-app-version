import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | {{app-version}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it displays entire version', async function (assert) {
    assert.expect(1);

    await render(hbs`{{app-version}}`);

    assert.ok(this.element.textContent, 'Version not empty');
  });

  test('it displays only app version (backwards compatible)', async function (assert) {
    assert.expect(1);

    await render(hbs`{{app-version hideSha=true}}`);

    assert.ok(this.element.textContent, 'Version not empty');
  });

  test('it displays only app version', async function (assert) {
    assert.expect(1);

    await render(hbs`{{app-version versionOnly=true}}`);

    assert.ok(this.element.textContent, 'Version not empty');
  });

  test('it displays only app version extended', async function (assert) {
    assert.expect(1);

    await render(hbs`{{app-version versionOnly=true showExtended=true}}`);

    assert.ok(this.element.textContent, 'Version not empty');
  });

  test('it displays only git sha (backwards compatible)', async function (assert) {
    assert.expect(1);

    await render(hbs`{{app-version hideVersion=true}}`);

    assert.ok(this.element.textContent, 'Version not empty');
  });

  test('it displays only git sha', async function (assert) {
    assert.expect(1);

    await render(hbs`{{app-version shaOnly=true}}`);

    assert.ok(this.element.textContent, 'Version not empty');
  });
});
