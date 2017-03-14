import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StackNavigator } from 'react-navigation';
import Home from './src/containers/Home';
import reducer from './src/reducers';

const store = createStore(reducer);
const Application = StackNavigator({
    Main: { screen: Home },
});

function JSWizard() {
    return (
        <Provider store={store}>
            <Application />
        </Provider>
    );
}
AppRegistry.registerComponent('JSWizard', () => JSWizard);
