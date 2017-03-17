import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import Navigator from '../components/Navigator';

function Application({ dispatch, navigation }) {
    const navigationHelpers = addNavigationHelpers({
        dispatch,
        state: navigation,
    });
    return (
        <Navigator navigation={navigationHelpers} />
    );
}
Application.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        index: PropTypes.number,
        routes: PropTypes.array,
    }).isRequired,
};
const mapStateToProps = state => ({
    navigation: state.navigation,
});
export default connect(mapStateToProps)(Application);
