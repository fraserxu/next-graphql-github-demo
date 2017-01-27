import ApolloClient, { createNetworkInterface } from 'apollo-client'

const TOKEN = process.env.TOKEN

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

export default (headers) => {
  const client = new ApolloClient({
    ssrMode: !process.browser,
    headers,
    dataIdFromObject: result => result.id || null,
    networkInterface
  })

  if (!process.browser) {
    return client
  }
  if (!window.APOLLO_CLIENT) {
    window.APOLLO_CLIENT = client
  }
  return window.APOLLO_CLIENT
}
