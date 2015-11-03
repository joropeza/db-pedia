var should = require('chai').should(),
	dbpedia = require('../index');


describe('#links', function() {
	it('returns a record', function() {
		this.timeout(5000);
		return dbpedia.person('George Washington').then(function(results) { 
			results.should.not.be.null;
		});
	});
});