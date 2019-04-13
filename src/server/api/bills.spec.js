const {expect} = require('chai')
const request = require('supertest')
const server = require('../index')

describe('Bills routes', () => {
  describe('/api/bills', () => {
    it('GET /api/bills', async () => {
      const res = await request(server)
        .get('/api/bills')
        .expect(200)

      expect(res.body.results[0].bills).to.be.an('array')
      expect(res.body.results[0].num_results).to.have.lengthOf()
    })
  }) // end describe('/api/bills')
}) // end describe('Bills routes')
