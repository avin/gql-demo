import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './style.css';
import storeObj from './redux/store';

const { store, history } = storeObj;

const httpLink = new HttpLink({
    uri: 'http://localhost:3001/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.warn(`[GQL error]: Message ${message}, Location: ${locations}, Path: ${path}`);
        });
    }

    if (networkError) {
        console.warn(`[Network error]: ${networkError}`);
    }
});

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache({
    logger: console.log,
    loggerEnabled: true,
});

const client = new ApolloClient({
    link,
    cache,
});

const target = document.getElementById('root');

ReactDOM.render(
    <App history={history} store={store} client={client} />,

    target,
);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        ReactDOM.render(<App history={history} store={store} client={client} />, target);
    });
}

registerServiceWorker();
