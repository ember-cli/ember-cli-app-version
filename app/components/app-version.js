import AppVersionComponent from 'ember-cli-app-version/components/app-version';

import config from '../config/environment';

var name = config.APP.name;
var version = config.APP.version;

export default AppVersionComponent.extend({
  version: version,
  name: name
});
