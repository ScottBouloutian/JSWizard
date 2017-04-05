import { combineReducers } from 'redux';
import navigation from './navigation';
import purchases from './purchases';

export default combineReducers({
    navigation,
    purchases,
});
