import { getAccessToken, setAccessToken } from "./accessToken";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

const cache = new InMemoryCache();

const requestLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    let handle: any;
    Promise.resolve(operation)
      .then((operation) => {
        const accessToken = getAccessToken();
        if (accessToken) {
          operation.setContext({
            headers: {
              "x-auth-token": `Bearer ${accessToken}`,
            },
          });
        }
      })
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
  });
});

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if (!token) {
      return true;
    }

    try {
      const { exp } = jwtDecode(token) as any;
      return Date.now() >= exp * 1000;
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch("http://localhost:5000/refresh-token", {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
  },
  handleError: (err) => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  },
}) as any;

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    tokenRefreshLink,
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    requestLink,
    new HttpLink({
      uri: "http://localhost:5000/graphql",
      credentials: "include",
    }),
  ]),
  cache,
}) as any;

export default apolloClient;
