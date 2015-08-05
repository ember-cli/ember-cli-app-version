import AppVersionComponent from 'ember-cli-app-version/components/app-version';

import config from '../config/environment';

const { name, version } = config.APP;

export default AppVersionComponent.extend({
  version: version,
  name: name
});
