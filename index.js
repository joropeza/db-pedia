var Promise = require('bluebird');
var SparqlClient = require('sparql-client');

const endpoint = 'http://dbpedia.org/sparql';

function qDbPedia(query) {
	return new Promise(function(resolve, reject) {
		var client = new SparqlClient(endpoint);
		console.log("Query to " + endpoint);
		console.log("Query: " + query);
		client.query(query)
			.execute(function(error, results) {
				if (results) {
					resolve(results.results.bindings);
				} else {
					reject(error);
				}
			});
	});
}

module.exports = {
	person: function(name) {
		qDbPedia(name).then(function (results) { 
			console.log(results);
		});
	}
};