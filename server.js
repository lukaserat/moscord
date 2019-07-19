require('dotenv/config')
const lo = require('lodash')
const request = require('request-promise')
const express = require('express')
const cors = require('cors')

const sumUntil = require('./lib/sumUntil')

const app = express()
app.use(cors())

const port = process.env.BACKEND_PORT || 3001

app.get('/task-b/:num', (req, res) => {
  const history = sumUntil(req.params.num)
  return res.json({ history, result: lo.last(history) })
})

// This path will let you get rss feeds without being block by same origin policy
app.get('/', async (req, res) => {
  let errorMessage = null
  let body = null

  if (lo.isEmpty(req.query.url)) {
    errorMessage = 'Empty url query'
  } else {
    try {
      body = await request.get(req.query.url)
      if (body.indexOf('<?xml') !== 0) {
        errorMessage = 'Invalid RSS Feed'
      }
    } catch (error) {
      errorMessage = error.message
    }
  }
  if (errorMessage) {
    return res.status(403).send(errorMessage)
  }
  return res.set('content-type', 'application/xml').send(Buffer.from(body))
})

app.listen(port, () => console.log(`Server listening to ${port}!`))