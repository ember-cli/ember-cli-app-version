import AppVersionComponent from 'ember-cli-app-version/components/app-version';

import config from '../config/environment';

const {
  APP: {
    name,
    version
  }
} = config;

export default AppVersionComponent.extend({
  version,
  name
});
