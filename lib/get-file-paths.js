'use strict';

var asyncCounter = 0,
	filePaths = [];

/**
 * Retrieves all the full paths associated to a file located on Google Drive.
 *
 * @method getFilePaths
 * @param {Object} googleDriveClient An instance of the Google Drive API client.
 * @param {String} fileId The target file's Google Drive ID.
 * @param {String} [path] The path of which the parents to retrieve. Initially should be an empty string.
 * @param {Function} [callback] Standard node format asynchronous callback function on complete.
 *
 * If an error occurs during the required operation, an error object is passed as first parameter to the provided callback,
 * otherwise an array containing all the possible full paths of the file as second parameter.
 */
function getFilePaths(googleDriveClient, fileId, path, callback) {
	googleDriveClient.files.get({
		fileId: fileId
	}, function(error, info) {
		var i;

		if (error) {
			callback && callback(error);
		}
		else {
			if (path.trim() !== '') {
				path = info.title + '/' + path;
			}
			else {
				path = info.title;
			}

			for (i in info.parents) {
				if (info.parents.hasOwnProperty(i) && !info.parents[i].isRoot) {
					asyncCounter++;
					getFilePaths(googleDriveClient, info.parents[i].id, path, callback);
				}
				else {
					filePaths.push('/' + path);

					asyncCounter--;
					if (asyncCounter === 1) {
						callback && callback(filePaths);
					}
				}
			}
		}
	});
}

module.exports = getFilePaths;
