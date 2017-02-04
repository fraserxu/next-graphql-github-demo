const qs = require('querystring')
const https = require('https')

const config = require('./config')

module.exports = (code, cb) => {
  const data = qs.stringify({
    client_id: config.oauth_client_id,
    client_secret: config.oauth_client_secret,
    code: code
  })

  const reqOptions = {
    host: config.oauth_host,
    port: config.oauth_port,
    path: config.oauth_path,
    method: config.oauth_method,
    headers: { 'content-length': data.length }
  }

  let body = ''
  let req = https.request(reqOptions, (res) => {
    res.setEncoding('utf8')
    res.on('data', (chunk) => { body += chunk })
    res.on('end', () => {
      const parsedBody = qs.parse(body)
      if (parsedBody.error) {
        cb(parsedBody.error)
      }
      cb(null, parsedBody.access_token)
    })
  })

  req.write(data)
  req.end()
  req.on('error', (e) => {
    cb(e.message)
  })
}
