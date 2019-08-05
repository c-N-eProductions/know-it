const { expect } = require('chai')
const request = require('supertest')
const server = require('../index')

let res = null

describe('Bills routes', () => {
  describe('GET https://api.propublica.org api', () => {
    before(async () => {
      res = await request('https://api.propublica.org')
        .get('/congress/v1/116/both/bills/introduced.json')
        .set('X-API-Key', process.env.PROPUBLICA_API_KEY)
    })

    it('returns with a 200 status', () => {
      expect(res.statusCode).to.equal(200)
    })

    it('the result body is an object', () => {
      expect(res.body).to.be.an('object')
    })

    it('the result returns an array of the last 20 congressional bills', () => {
      expect(res.body.results[0].bills).to.have.lengthOf(20)
    })
  }) // end describe('GET https://api.propublica.org api')

  describe('GET /api/bills', () => {
    beforeEach(async () => {
      res = await request(server).get('/api/bills')
    })

    it('returns with a 200 status', () => {
      expect(res.statusCode).to.equal(200)
    })

    it('the result has a bills property', () => {
      expect(res.body.results[0]).to.have.property('bills')
    })

    it('the result returns an array of the last 20 congressional bills', () => {
      expect(res.body.results[0].bills).to.have.lengthOf(20)
    })
  }) // end describe('GET /api/bills')
}) // end describe('Bills routes')
