import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import reducer from './src/reducers';
import Application from './src/containers/Application';

const development = global.__DEV__;

const logger = createLogger();
const middlewares = [
    thunk,
    reduxPromiseMiddleware(),
];
if (development) {
    middlewares.push(logger);
}
const store = compose(applyMiddleware(...middlewares))(createStore)(reducer);

function JSWizard() {
    return (
        <Provider store={store}>
            <Application />
        </Provider>
    );
}
AppRegistry.registerComponent('JSWizard', () => JSWizard);
