import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "store";
import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  split,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import { getAccessToken } from "./accessToken";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
const wsLink = new GraphQLWsLink(
  createClient({
    url: "https://api.heala.io/",
  }),
);

const httpLink = new HttpLink({
  uri: "https://api.heala.io/",
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink,
);

const authMiddleware = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      authorization: accessToken ? `bearer ${accessToken}` : null,
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: concat(authMiddleware, splitLink),
  resolvers: {},
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root"),
);
