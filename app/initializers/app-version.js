import initializerFactory from 'ember-cli-app-version/initializer-factory';
import config from '../config/environment';

export default {
  name: 'App Version',
  initialize: initializerFactory(config.APP.name, config.APP.version)
}
