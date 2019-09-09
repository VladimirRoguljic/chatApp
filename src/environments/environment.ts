// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ws_url: 'http://localhost:5000',
  firebase: {
    apiKey: "AIzaSyCK3x4yJEIoyvDMU-cpV9nbdk--hU23FCA",
    authDomain: "chatapp-project-f5ada.firebaseapp.com",
    databaseURL: "https://chatapp-project-f5ada.firebaseio.com",
    projectId: "chatapp-project-f5ada",
    storageBucket: "",
    messagingSenderId: "465716890228",
    appId: "1:465716890228:web:b152c33540ca22aaeb5f21"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
