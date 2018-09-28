/*
 * @app.spec.js - tests the server app and default responses
 */

process.env.NODE_ENV = 'test'
const app = require('../app.js')
const mocha = require('mocha')
const chai = require('chai')
const request = require('supertest')
const expect = chai.expect
const LOG = require('../utils/logger.js')

LOG.info('Starting app.spec.js.')


mocha.describe('API Test', function () {
  mocha.describe('GET /', function () {
    mocha.it('responds with status 200', function (done) {
      request(app)
        .get('/')
        .end(function (err, response) {
          if (err) return done(err)
          expect(response.status).to.be.equal(200)
          done()
        })
    })
  })
  mocha.describe('GET /abc', function () {
    mocha.it('responds with status 404', function (done) {
      request(app)
        .get('/xyz')
        .end(function (err, response) {
          if (err) { }
          expect(response.status).to.be.equal(404)
          done()
        })
    })
  })
})
