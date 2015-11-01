# db-pedia
==========

wrapper around the dbpedia json endpoint and (future) sparql endpoint for people, places, things

Usage
=====

```javascript

var dbpedia = require('./index.js');

dbpedia.person('George Washington').then(function(results) { 
	console.log(results);
});

```

Near-term to-dos
======

- Add some tests
- Handle 404s
