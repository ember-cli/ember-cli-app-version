import initializerFactory from 'ember-cli-app-version/initializer-factory';
import getAppVersion from 'ember-cli-app-version/utils/get-app-version';

export default {
  name: 'App Version',
  initialize: initializerFactory('ember-cli-app-version', getAppVersion()),
};
