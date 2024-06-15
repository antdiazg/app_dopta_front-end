// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environments = {
  BASE_URL: "http://localhost:8100",
  URL_USER: 'http://alb-appdoptauser-1760123330.us-east-1.elb.amazonaws.com/',
  URL_POST: 'http://alb-appdoptapost-245125318.us-east-1.elb.amazonaws.com/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
