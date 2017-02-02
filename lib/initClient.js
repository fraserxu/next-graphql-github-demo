import ApolloClient, { createNetworkInterface } from 'apollo-client'
import parser from 'cookie'

let apolloClient = null

const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql'
})

const createClient = (headers) => {
  const cookies = parser.parse(headers.cookie)
  const TOKEN = cookies.github_token
  networkInterface.use([{
    applyMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }

      // Send the login token in the Authorization header
      req.options.headers.authorization = `Bearer ${TOKEN}`
      next()
    }
  }])

  return new ApolloClient({
    ssrMode: !process.browser,
    headers,
    dataIdFromObject: result => result.id || null,
    networkInterface
  })
}

export default (headers) => {
  if (!process.browser) {
    return createClient(headers)
  }

  if (!apolloClient) {
    apolloClient = createClient(headers)
  }
  return apolloClient
}
