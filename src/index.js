import React, { createRef } from "react";
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
import { createClient } from "graphql-ws";
import { Typography } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { getAccessToken } from "./accessToken";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// import dotenv
import "dotenv/config";

const wsLink = new GraphQLWsLink(
  createClient({
    //eslint-disable-next-line
    url: process.env.REACT_APP_BASE_URL,
  })
);

const httpLink = new HttpLink({
  //eslint-disable-next-line
  uri: process.env.REACT_APP_BASE_URL,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
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

// add action to all snackbars
const notistackRef = createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

ReactDOM.render(
  <SnackbarProvider
    ref={notistackRef}
    maxSnack={3}
    action={(key) => (
      <Typography
        onClick={onClickDismiss(key)}
        style={{
          fontSize: "1.2rem",
          color: "ffffff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Dismiss
      </Typography>
    )}
  >
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </SnackbarProvider>,
  document.getElementById("root")
);
