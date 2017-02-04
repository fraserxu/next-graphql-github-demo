import { ApolloProvider, getDataFromTree } from 'react-apollo'
import React from 'react'
import 'isomorphic-fetch'
import cookies from 'next-cookies'
import Router from 'next/router'

import initClient from './initClient'
import initStore from './initStore'

export default (Component) => (
  class extends React.Component {
    static async getInitialProps (ctx) {
      const headers = ctx.req ? ctx.req.headers : {}
      // const token = cookies(ctx).github_token

      // if (!token) {
      //   if (process.browser) {
      //     Router.push('/')
      //   } else {
      //     console.log('ctx', ctx)
      //     ctx.res.redirect('/')
      //   }
      // }

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
            data: state.apollo.data || {}
          }
        },
        headers,
        ...props
      }
    }

    constructor (props) {
      super(props)
      this.client = initClient(this.props.headers)
      this.store = initStore(this.client, this.props.initialState)
    }

    render () {
      return (
        <ApolloProvider client={this.client} store={this.store}>
          <Component {...this.props} />
        </ApolloProvider>
      )
    }
  }
)
