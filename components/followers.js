import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const followers = (props) => {
  const { user: {
    followers: {
      edges
    }
  } } = props.data

  return (
    <section>
      followers...
      {edges.map((edge, key) => (
        <li key={key}>
          {edge.node.login}
          <img src={edge.node.avatarURL} />
        </li>
      ))}
    </section>
  )
}

const query = gql`
  query AppQuery {
    user (login: "fraserxu") {
      followers (first: 100) {
        edges {
          node {
            ... on User {
              login,
              avatarURL
            }
          }
        }
      }
    }
  }
`

export default graphql(query, {
  props: ({ data }) => ({
    data
  })
})(followers)
