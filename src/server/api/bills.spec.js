const {expect} = require('chai')
const request = require('supertest')

let res = null

describe('Bills routes', () => {
  describe('GET https://api.propublica.org api', () => {
    beforeEach(async () => {
      res = await request('https://api.propublica.org')
        .get('/congress/v1/115/both/bills/introduced.json')
        .set('X-API-Key', 'pmNjGSzuJhAwWaP4Mtcqb09bG93bhsTgBfvNtVnP')
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
  }) // end describe('/api/bills')
}) // end describe('Bills routes')
