#Google Drive Paths

A standalone Node module capable to interact with Goole Drive API v2 and retrieve a list with all the possible full paths of a file located in Google Drive.

[![NPM](https://nodei.co/npm/google-drive-paths.png)](https://nodei.co/npm/google-drive-paths/)

##Installation steps
1. `npm install google-drive-paths`


##Usage
```javascript
var getFilePaths = require('google-drive-paths');

getFilePaths(googleDriveClient, GOOLE_DRIVE_FILE_ID, '', function(paths) {
    console.log(paths);
});
```

##Example
```javascript
var google = require('googleapis'),
	OAuth2 = google.auth.OAuth2,
	getFilePaths = require('google-drive-paths'),
	CLIENT_API_KEY = 'YOUR API KEY HERE',
	CLIENT_API_SECRET = 'YOUR API SECRET HERE',
	CLIENT_REDIRECT_URI = 'YOUR SPECIFIED REDIRECT URI HERE',
	ACCESS_TOKEN = 'YOUR ACCESS TOKEN HERE',
	REFRESH_TOKEN = 'YOUR REFRESH TOKEN HERE',
	oauth2Client,
	googleDriveClient;

oauth2Client = new OAuth2(CLIENT_API_KEY, CLIENT_API_SECRET, CLIENT_REDIRECT_URI);

oauth2Client.setCredentials({
	access_token: ACCESS_TOKEN,
	refresh_token: REFRESH_TOKEN
});

googleDriveClient = google.drive({
	version: 'v2',
	auth: oauth2Client
});

getFilePaths(googleDriveClient, 'THE TARGET FILE ID HERE', '', function(paths) {
	/* assuming our target file is named "testFile.png", it should retrieve all paths and output something like this:
	 [
		 '/folder1/testFile.png/',
		 '/folderX/testFile.png/',
		 '/folder3/testFile.png/',
		 '/folder2/testFile.png/',
		 '/folderX/folder1/testFile.png/',
		 '/folder1/folder1.1/testFile.png/',
		 '/folderX/folder2/testFile.png/',
		 '/folderX/folder1/folder1.1/testFile.png/',
		 '/folderX/folder3/testFile.png/'
	 ]
	 */
	console.log(paths.length);
	console.log(paths);
});
```

##Current version
The current version is 1.0.1.
