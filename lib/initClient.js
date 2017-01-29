import ApolloClient, { createNetworkInterface } from 'apollo-client'

const TOKEN = process.env.TOKEN
let apolloClient = null

const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql'
})

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

const createClient = (headers) => {
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