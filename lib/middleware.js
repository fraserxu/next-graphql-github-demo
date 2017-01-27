import { applyMiddleware, compose } from 'redux'

export default (clientMiddleware) => {
  const middleware = applyMiddleware(clientMiddleware)
  if (process.browser && window.devToolsExtension) {
    return compose(middleware, window.devToolsExtension())
  }
  return middleware
}
