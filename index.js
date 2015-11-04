var Promise = require('bluebird');

const dbPediaJsonEndpoint = 'http://dbpedia.org/resource/';

var request = require('request-json');
var client = request.createClient(dbPediaJsonEndpoint);

String.prototype.replaceAll = function(str1, str2, ignore) {
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof(str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
}

function requestDbPedia(queryString) {
	return new Promise(function(resolve, reject) {
		client.get(queryString, function(err, res, body) {
	  		if (body) {
	  			resolve(body);
	  		}
	  		if (err) {
	  			reject(err);
	  		}
		});
	});
}

module.exports = {
	person: function(name) {
		return requestDbPedia(name.replaceAll(" ", "_")).then(function(results) {
			return results; 
		});
	}
};