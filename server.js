const express = require('express')
const next = require('next')

const authenticate = require('./lib/authenticate')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('/health', (req, res) => {
      res.send('ok!')
    })

    server.get('/oauth_redirect', (req, res) => {
      authenticate(req.query.code, (err, token) => {
        if (err) {
          res.clearCookie('github_token')
          res.redirect('/error')
        }
        res.cookie('github_token', token, {
          expires: new Date(Date.now() + 900000)
        })
        res.redirect('/how')
      })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
