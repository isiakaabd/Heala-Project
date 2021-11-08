import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "store";
// import { TokenRefreshLink } from "apollo-link-token-refresh";
// import jwtDecode from "jwt-decode";

import {
  ApolloClient,
  // Observable,
  // ApolloLink,
  // HttpLink,
  ApolloProvider,
  // from,
  InMemoryCache,
} from "@apollo/client";
import { getAccessToken } from "components/pages/accessToken";
// import { onError } from "@apollo/client/link/error";
// import { LOGOUT_USER } from "components/graphQL/Mutation";

// const errorLink = onError(({ graphqlErrors, networkError }) => {
//   if (graphqlErrors) {
//     graphqlErrors.map(({ message, location, path }) => {
//       console.log(message);
//     });
//   }
//   if (networkError) {
//     console.log(networkError);szZz
//   }
// });

// const accessToken = localStorage.getItem("access_token");
// const refresh_token = localStorage.getItem("refresh_token");

// const http = new HttpLink({ uri: "http://api-staging.doci.ng", credentials: "include" });
// const requestLink = new ApolloLink(
//   (operation, forward) =>
//     new Observable((observer) => {
//       let handle;
//       Promise.resolve(operation)
//         .then((operation) => {
//           // const accessToken = getAccessToken();
//           operation.setContext({
//             headers: {
//               authorization: accessToken ? `bearer ${accessToken}` : "",
//             },
//           });
//         })
//         .then(() => {
//           handle = forward(operation).subscribe({
//             next: observer.next.bind(observer),
//             error: observer.error.bind(observer),
//             complete: observer.complete.bind(observer),
//           });
//         })
//         .catch(observer.error.bind(observer));
//       return () => {
//         if (handle) handle.unsubscribe();
//       };
//     }),
// );
// const client = new ApolloClient({
//   link: ApolloLink.from([
//     new TokenRefreshLink({
//       isTokenValidOrUndefined: () => {
//         if (!accessToken) return true;
//         try {
//           const { exp } = jwtDecode(accessToken);
//           if (Date.now() >= exp * 1000) return false;
//           else return true;
//         } catch {
//           return false;
//         }
//       },
//       fetchAccessToken: () => {
//         return refresh_token;
//       },
//       handleFetch: (access) => {
//         setAccessToken(access);
//       },
//       handleError: (err) => {
//         // full control over handling token fetch Error
//         console.warn("Your refresh token is invalid. Try to relogin");
//         console.error(err);
//       },
//     }),

//     onError(({ graphqlErrors, networkError }) => {
//       console.log(graphqlErrors);
//       if (networkError) {
//         LOGOUT_USER();
//       }

//       console.log(networkError);
//     }),
//   ]),
//   requestLink,
//   http,
//   cache: new InMemoryCache(),
//   credentials: "include",
// });
console.log("token", getAccessToken());

const client = new ApolloClient({
  uri: "http://api-staging.doci.ng",
  credentials: "include",
  cache: new InMemoryCache(),

  request: (operation) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      operation.setContext({
        headers: {
          authorization: `bearer ${accessToken}`,
        },
      });
    }
  },
});
ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root"),
);
