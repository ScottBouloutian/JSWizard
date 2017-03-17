import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import reducer from './src/reducers';
import Application from './src/containers/Application';

const development = global.__DEV__;

const logger = createLogger();
const middlewares = development ? [logger] : [];
const store = compose(applyMiddleware(...middlewares))(createStore)(reducer);

function JSWizard() {
    return (
        <Provider store={store}>
            <Application />
        </Provider>
    );
}
AppRegistry.registerComponent('JSWizard', () => JSWizard);
