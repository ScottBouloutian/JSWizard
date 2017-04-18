/*
    JSWizard, a JavaScript documentation application.
    Copyright (C) 2017  Scott Bouloutian

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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
