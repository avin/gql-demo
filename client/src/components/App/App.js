import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Navigation from '../Navigation/Navigation';
import Home from '../Home';
import Posts from '../Posts';
import Post from '../Post';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import CreatePost from '../CreatePost';

export default class App extends React.Component {
    render() {
        const { history, store, client } = this.props;

        return (
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <div>
                        <ConnectedRouter history={history}>
                            <div className="App">
                                <Navigation />

                                <div className="App-main">
                                    <Route exact path="/" component={Home} />
                                    <Route exact path="/posts" component={Posts} />
                                    <Route exact path="/post/:id" component={Post} />
                                    <Route exact path="/create_post" component={CreatePost} />
                                </div>
                            </div>
                        </ConnectedRouter>
                    </div>
                </ApolloProvider>
            </Provider>
        );
    }
}
