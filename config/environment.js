/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'foosball',
    environment: environment,
    contentSecurityPolicy: { 'connect-src': "'self' https://auth.firebase.com wss://*.firebaseio.com" },
    podModulePrefix: 'foosball/pods',
    firebase: 'https://netuitivefoosball.firebaseio.com/',
    torii: {
      sessionServiceName: 'session'
    },
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy = {
     'img-src': "*",
     'font-src': "https://fonts.gstatic.com http://localhost:4200 http://www.fontsaddict.com",
     'style-src': "'self' 'unsafe-inline'",
     'connect-src': "'self' http://localhost:3000 https://*.firebaseio.com wss://*.firebaseio.com",
     'report-uri': "'none'",
     'script-src': "*"
   };
    ENV.firebase = 'https://dev-foosball.firebaseio.com/';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
