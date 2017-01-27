#### init project.
```sh
yarn init -y
```

#### add dependencies.
```sh
yarn add yarn add apollo-client graphql next@latest react-apollo react-redux redux redux-thunk cowsay-browser
```

#### add `pages/index.js`.

```js
import React from 'react'
import cowsay from 'cowsay-browser'

export default () => (
  <pre>{ cowsay.say({ text: 'hi next graphql github demo!' }) }</pre>
)
```

#### add npm run scripts to `package.json`.

```json
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
}
```

#### start dev server

```sh
npm run dev
```

#### Connect `redux` and `apollo-client` to `AppContainer`
Create apollo-client instance with `initClient.js`

```js
const client = new ApolloClient({
  ssrMode: !process.browser,
  headers,
  dataIdFromObject: result => result.id || null,
  networkInterface
})
```

Connect to [Github Graphql api](https://developer.github.com/early-access/graphql/explorer/)

```js
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
```

Create redux store with `initStore.js`
```js
export default (client, initialState) => {
  let store
  if (!process.browser || !window.REDUX_STORE) {
    const middleware = createMiddleware(client.middleware())
    store = createStore(getReducer(client), initialState, middleware)
    if (!process.browser) {
      return store
    }
    window.REDUX_STORE = store
  }

  return window.REDUX_STORE
}
```

#### Hook up apollo-client and redux store into application with `withData` HOC
```js
static async getInitialProps (ctx) {
  const headers = ctx.req ? ctx.req.headers : {}
  const client = initClient(headers)
  const store = initStore(client, client.initialState)

  const props = {
    url: { query: ctx.query, pathname: ctx.pathname },
    ...await (Component.getInitialProps ? Component.getInitialProps(ctx) : {})
  }

  if (!process.browser) {
    const app = (
      <ApolloProvider client={client} store={store}>
        <Component {...props} />
      </ApolloProvider>
    )
    await getDataFromTree(app)
  }

  const state = store.getState()
  return {
    initialState: {
      ...state,
      apollo: {
        data: state.apollo.data
      }
    },
    headers,
    ...props
  }
}
```

#### Querying data

```js
const login = gql`
  query AppQuery {
    user (login: "fraserxu") {
      repositories(first: 100) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
````

#### Select data from container
```js
export default graphql(login, {
  props: ({ data }) => ({
    data
  })
})(repos)
```

#### Render data to page
```js
const repos = (props) => {
  const { user: {
    repositories: {
      edges
    }
  } } = props.data

  return (
    <section>
      repos...
      <ul>
        {edges.map((edge, index) => (
          <li key={index}>{edge.node.name}</li>
        ))}
      </ul>
    </section>
  )
}
```
