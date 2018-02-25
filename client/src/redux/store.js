import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHashHistory from 'history/createHashHistory';
import rootReducer from './modules';

const history = createHashHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        module.hot.accept('./modules', () => {
            store.replaceReducer(rootReducer);
        });
    }
}

export default { store, history };
