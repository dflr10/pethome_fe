import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";
import { setContext } from "apollo-link-context";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const httpLink = createHttpLink({
  uri: "https://registerapigateway.herokuapp.com/", // URL APIGATEWAY Adoptions, customers
});

const httpLink2 = createHttpLink({
  uri: "https://gateway-g1-c4-petauth.herokuapp.com/", // URL APIGATEWAY auth, pets
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: localStorage.getItem("token_access") || "",
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const apolloProvider = new createApolloProvider({
  defaultClient: apolloClient,
});

const apolloClient2 = new ApolloClient({
  link: authLink.concat(httpLink2),
  cache: new InMemoryCache(),
});

const apolloProvider2 = new createApolloProvider({
  defaultClient: apolloClient2,
});

createApp(App)
  .use(router)
  .use(apolloProvider)
  .use(apolloProvider2)
  .mount("#app");
