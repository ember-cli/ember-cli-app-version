import initializerFactory from 'ember-cli-app-version/initializer-factory';
import config from '../config/environment';

let name;
if (config.APP) {
  name = config.APP.name;
}

export default {
  name: 'App Version',
  initialize: initializerFactory(name, config['ember-cli-app-version'].version),
};
