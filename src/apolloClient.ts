import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri:
    process.env.REACT_APP_GRAPHQL_API ||
    'https://coryx-pas-test.etops.ch/staging-api/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwttoken')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
