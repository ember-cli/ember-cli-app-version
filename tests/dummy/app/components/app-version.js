import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  version: config.APP.version
});
