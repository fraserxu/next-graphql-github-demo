module.exports = {
  oauth_client_id: process.env.OAUTH_CLIENT_ID,
  oauth_client_secret: process.env.OAUTH_CLIENT_SECRET,
  oauth_host: 'github.com',
  oauth_path: '/login/oauth/access_token',
  oauth_port: 443,
  oauth_method: 'POST',
  scope: 'user, repo'
}
