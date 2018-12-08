'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('404 endpoints', function (){
	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	after(function(){
		return closeServer();
	});

	  beforeEach(function () { });

	it('should get a 404', function(){
    return chai.request(app)
      .get('/elkfj')
      .then(function(res){
        expect(res).to.have.status(200);
      });
  });
});
