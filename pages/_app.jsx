import React, { useEffect } from 'react'
import '../styles/globals.css'
import { ApolloClient, ApolloProvider, createHttpLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context'

import 'bootstrap/dist/css/bootstrap.min.css';

const uri = process.env.NEXT_PUBLIC_API_URI;
const httpLink = createHttpLink({ uri })
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri,
//   }),
//   cache,
//   connectToDevTools: true
// });

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const data = {
      isLoggedIn: !!localStorage.getItem('token')
    }
    
    cache.writeData({ data })
    
    client.onResetStore(() => cache.writeData({ data }))
  }, [])

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
