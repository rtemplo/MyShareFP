import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
// import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { AUTH_TOKEN } from './constants'
// import { ApolloLink, split } from 'apollo-client-preset'
import { ApolloLink } from 'apollo-client-preset'
// import { WebSocketLink } from 'apollo-link-ws'
// import { getMainDefinition } from 'apollo-utilities'

import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"

const httpLink = new createHttpLink({uri: 'http://localhost:3000/graphql'})

// const authLink = token =>
//   setContext((_, { headers }) => ({
//     headers: {
//       ...headers,
//       ...(token ? { Authorization: `Bearer ${token}` } : {})
//     }
//   }));

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache()
});

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:3000`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       authToken: localStorage.getItem(AUTH_TOKEN),
//     }
//   }
// })

// const link = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query)
//     return kind === 'OperationDefinition' && operation === 'subscription'
//   },
//   wsLink,
//   httpLinkWithAuthToken,
// )

// const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache()
// })

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
  , document.getElementById('root')
)
registerServiceWorker()