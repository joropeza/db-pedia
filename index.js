var Promise = require('bluebird');
var SparqlClient = require('sparql-client');

const endpoint = 'http://dbpedia.org/sparql';
const dbPediaJsonEndpoint = 'http://dbpedia.org/resource/';

var request = require('request-json');
var client = request.createClient(dbPediaJsonEndpoint);

function requestDbPedia(queryString) {
	return new Promise(function(resolve, reject) {
		client.get(queryString, function(err, res, body) {
	  		resolve(body);
		});
	});
}

function personQuerystring(queryString) {
	var query = "PREFIX dbpedia-owl: <http://dbpedia.org/ontology/> PREFIX dbpprop: <http://dbpedia.org/property/> " +
		" SELECT * { " +
		"<http://dbpedia.org/resource/" + queryString + "> dbpedia-owl:birthDate ?birthDate . " +
		"optional { <http://dbpedia.org/resource/" + queryString + "> dbpedia-owl:deathDate ?deathDate } . " +
		"<http://dbpedia.org/resource/" + queryString + "> rdfs:label ?label . " +
		"<http://dbpedia.org/resource/" + queryString + "> rdfs:comment ?comment . " +
		"<http://dbpedia.org/resource/" + queryString + "> dbpedia-owl:wikiPageID ?wikiId . " +
		"optional { <http://dbpedia.org/resource/" + queryString + "> dbpprop:shortDescription ?description } . " +
		"FILTER langMatches(lang(?label), 'en') " +
		"FILTER langMatches(lang(?comment), 'en') " +
		"}";

	return query;
}

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
		return requestDbPedia(name).then(function(results) {
			return results; 
		});
	},
	personSparql: function(name) {
		var queryString = personQuerystring(name);
		qDbPedia(queryString).then(function (results) { 
			console.log(results);
		});
	}
};