// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false
};

export const database = {

	firebaseAppConfig: {
		apiKey: "AIzaSyBek8EcAPhGyBZWawFNpwowVxFmT7GyWgc",
		authDomain: "jamdeck.firebaseapp.com",
		databaseURL: "https://jamdeck.firebaseio.com",
		projectId: "firebase-jamdeck",
		storageBucket: "firebase-jamdeck.appspot.com",
		messagingSenderId: "41851418000"
	},
	jamFireStoreConfig: {
		databaseMetadataPath: 'Metadata/database/Table'
	}
	
}