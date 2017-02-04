import React from 'react'

import config from '../lib/config'

const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${config.oauth_client_id}&scope=${config.scope}`

export default () => (
  <section>
    <a href={oauthUrl}>Login</a>
  </section>
)
