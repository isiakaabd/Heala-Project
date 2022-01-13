import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "store";
import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  concat,
  Observable,
} from "@apollo/client";
import { getAccessToken } from "./accessToken";
import { getProfile } from "components/graphQL/useQuery";

const queryRequiresVariable = ({ variableName, operation }) =>
  operation.query.definitions?.some(({ variableDefinitions }) =>
    variableDefinitions?.some(({ variable }) => variable.name.value === variableName),
  );

const injectVariables = async (operation) => {
  const variableName = "profileId";
  if (
    queryRequiresVariable({
      variableName,
      operation,
    })
  ) {
    const results = await client.query({
      query: getProfile,
      fetchPolicy: "cache-first",
    });
    const patient = results?.data?.user?.patient;
    operation.variables[variableName] = patient;
  }
};

const variableInjectionLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle;
      Promise.resolve(operation)
        .then((oper) => injectVariables(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    }),
);

const httpLink = createHttpLink({
  uri: "http://api-staging.heala.io",
  credentials: "include",
});

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
  link: concat(authMiddleware, httpLink),
  variableInjectionLink,
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root"),
);
