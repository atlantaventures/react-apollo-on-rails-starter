// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { BrowserRouter } from 'react-router-dom';

import ApplicationContainer from '../ApplicationContainer';

const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => (
  {
    headers: {
      ...headers,
      'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content'),
    },
  }
));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const ReactApolloOnRailsStarter = props => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ApplicationContainer />
    </BrowserRouter>
  </ApolloProvider>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ReactApolloOnRailsStarter name="React" />,
    document.body.appendChild(document.createElement('div')),
  );
});
