const router = require('express').Router()
const https = require('https')

module.exports = router

router.get('/', async (req, res, next) => {
  const options = {
    host: 'api.propublica.org',
    path: '/congress/v1/116/both/bills/introduced.json',
    headers: {
      'x-api-key': process.env.PROPUBLICA_API_KEY
    }
  }

  let billsData = ''
  await https.get(options, resp => {
    // A chunk of data has been received.
    resp.on('data', bills => {
      billsData += bills
    })

    // The whole response has been received.
    resp.on('end', () => {
      res.status(200).send(JSON.parse(billsData))
    })
  })
})
