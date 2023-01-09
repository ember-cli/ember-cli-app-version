'use strict';

const expect = require('chai').expect;
const addon = require('../../index');

describe('index.js', function () {
  describe('config', function () {
    describe('storeVersionInMeta=true', function () {
      it('should not add a version to the environment config', function (done) {
        let context = {
          name: 'ember-cli-app-version',
          project: {
            pkg: {
              name: 'ember-cli-app-version',
            },
            root: '/ember-cli-app-version',
          },
          _super: {
            config: () => {},
          },
        };

        let environmentConfig = {
          APP: {},
          'ember-cli-app-version': {
            storeVersionInMeta: true,
          },
        };

        addon.config.apply(context, ['production', environmentConfig]);

        expect(environmentConfig.APP.version).to.be.undefined;
        done();
      });
    });

    describe('storeVersionInMeta=false', function () {
      it('should add a version to the environment config', function (done) {
        let context = {
          name: 'ember-cli-app-version',
          project: {
            pkg: {
              name: 'ember-cli-app-version',
            },
            root: '/ember-cli-app-version',
          },
          _super: {
            config: () => {},
          },
        };

        let environmentConfig = {
          APP: {},
          'ember-cli-app-version': {
            storeVersionInMeta: false,
          },
        };

        addon.config.apply(context, ['production', environmentConfig]);

        expect(environmentConfig.APP.version).is.a('string');
        done();
      });
    });
  });
});
