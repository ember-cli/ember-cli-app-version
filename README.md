# ember-cli-app-version

[![CI](https://github.com/ember-cli/ember-cli-app-version/workflows/CI/badge.svg)](https://github.com/ember-cli/ember-cli-app-version/actions?query=workflow%3ACI)
[![NPM Version](https://badge.fury.io/js/ember-cli-app-version.svg)](https://badge.fury.io/js/ember-cli-app-version)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-app-version.svg)](https://emberobserver.com/addons/ember-cli-app-version)

Adds your Ember App's version to Info tab in Ember Inspector. The version is taken from your project's package.json#version.
If you add build metadata to the version, this addon will automatically append SHA to the end of the version.

## Compatibility

- Ember.js v3.28 or above
- Ember CLI v3.28 or above
- Node.js v18 or above

## Installation

```
ember install ember-cli-app-version
```

## Usage

![Ember Inspector Info Tab](https://www.evernote.com/shard/s51/sh/c2f52608-bc17-4d5c-ac76-dec044eeb2e2/2f08de0cfb77217502cfc3a9188d84bf/res/3fb1d3d9-d809-48f6-9d3b-6e9a4af29892/skitch.png?resizeSmall&width=832)

## {{app-version}} helper

This addon provides `{{app-version}}` helper that allows you to show your current app version in your app.

The addon has flags to display parts of the version:

- `{{app-version versionOnly=true}} // => 2.0.1`
- `{{app-version versionOnly=true showExtended=true}} // => 2.0.1-alpha.1`
- `{{app-version shaOnly=true}} // => <git SHA>`

Flags are `false` by default.

## Heroku

When running on Heroku the `.git` folder is not present, making it impossible to fetch the `git SHA`. A workaround for this is adding the below in your `config/environment.js`:

```js
// Heroku Git Hash support
if (process.env.SOURCE_VERSION) {
  const pkg = require('../package.json');
  const hash = process.env.SOURCE_VERSION.substr(0, 7);
  ENV['ember-cli-app-version'] = {
    version: `${pkg.version}+${hash}`,
  };
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
