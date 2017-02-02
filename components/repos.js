import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const repos = ({
  data: {
    user,
    loading
  }
}) => {
  if (loading) {
    return <div>loading repos...</div>
  }

  const {
    repositories: {
      edges
    }
  } = user

  return (
    <section>
      <ul>
        {edges.map((edge, index) => (
          <li key={index}>{edge.node.name}</li>
        ))}
      </ul>
    </section>
  )
}

const query = gql`
  query AppQuery($login: String!) {
    user (login: $login) {
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
  options: {
    variables: {
      login: 'fraserxu'
    }
  },
  props: ({ data }) => ({
    data
  })
})(repos)
