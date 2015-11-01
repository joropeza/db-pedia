var dbpedia = require('./index.js');

dbpedia.person('George Washington').then(function(results) { 
	console.log(Object.keys(results).length);
});