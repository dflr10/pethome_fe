import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option';
import { setContext } from 'apollo-link-context';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const httpLink = createHttpLink({
    uri: 'https://registerapigateway.herokuapp.com/', // URL APIGATEWAY
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "Authorization": localStorage.getItem("token_access") || ""
        }
    }
});

const apolloClient = new ApolloClient({
   link: authLink.concat(httpLink),
   cache: new InMemoryCache()
});

const apolloProvider = new createApolloProvider({
   defaultClient: apolloClient
});

createApp(App).use(router).use(apolloProvider).mount("#app");
