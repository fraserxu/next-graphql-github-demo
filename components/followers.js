import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const FOLLOWERS_PER_PAGE = 5

const followers = ({
  data: {
    user,
    loading
  },
  loadMoreFolowers
}) => {
  if (loading) {
    return <div>loading followers...</div>
  }

  const {
    followers: {
      edges,
      pageInfo: {
        hasNextPage
      }
    }
  } = user

  return (
    <section>
      followers...
      <ul>
        {edges.map((edge, key) => (
          <li key={key}>
            <img src={edge.node.avatarURL} />
            <a className='title' href={edge.node.url}>{edge.node.login}</a>
          </li>
        ))}
      </ul>

      {hasNextPage ? <button onClick={() => loadMoreFolowers()}><span />Show More</button> : ''}

      <style jsx>{`
        ul {
          display: flex;
          flex-wrap: wrap;
          align-content: center;
          align-items: center;
        }
        li {
          list-style: none;
          width: 200px;
        }
        img {
          width: 200px;
        }
        .title {
          display: block;
          margin: 20px 10px;
        }
      `}</style>
    </section>
  )
}

const query = gql`
  query AppQuery($login: String!, $first: Int!, $after: String) {
    user (login: $login) {
      followers (first: $first, after: $after) {
        edges {
          node {
            ... on User {
              login,
              avatarURL,
              url
            }
          }
        },
        pageInfo {
          hasNextPage,
          endCursor
        }
      }
    }
  }
`

export default graphql(query, {
  options: {
    variables: {
      login: 'fraserxu',
      first: FOLLOWERS_PER_PAGE
    }
  },
  props: ({ data }) => ({
    data,
    loadMoreFolowers: () => {
      return data.fetchMore({
        variables: {
          after: data.user.followers.pageInfo.endCursor
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult.data) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            // Append the new followers results to the old one
            user: {
              followers: {
                edges: [
                  ...previousResult.user.followers.edges,
                  ...fetchMoreResult.data.user.followers.edges
                ],
                pageInfo: fetchMoreResult.data.user.followers.pageInfo
              }
            }
          })
        }
      })
    }
  })
})(followers)
