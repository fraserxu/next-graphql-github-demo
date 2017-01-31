import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

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

const query = gql`
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
`

export default graphql(query, {
  props: ({ data }) => ({
    data
  })
})(repos)
