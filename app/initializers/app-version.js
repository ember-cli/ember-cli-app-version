import initializerFactory from 'ember-cli-app-version/initializer-factory';

import config from '../config/environment';

const { name, version } = config.APP;

export default {
  name: 'App Version',
  initialize: initializerFactory(name, version)
}
