import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { View, StyleSheet, Alert, AppState } from 'react-native';
import { AdMobBanner } from 'react-native-admob';
import { assign } from 'lodash';
import Navigator from '../components/Navigator';
import { restorePurchases, dismissError } from '../actions/purchases';
import { showInterstitial } from '../actions/ads';

const bannerId = 'ca-app-pub-4400088783500800/8086867772';
const styles = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%',
    },
});

class Application extends Component {
    constructor() {
        super();
        this.state = {
            appState: AppState.currentState,
            showInterstitial: true,
        };
        this.handleAppStateChange = (nextAppState) => {
            const { appState } = this.state;
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                this.setState({ showInterstitial: true });
            }
            this.setState({ appState: nextAppState });
        };
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    render() {
        const { navigation, showAds, load, error, dismiss, launchInterstitial } = this.props;

        // Alert if there is an error
        if (error) {
            Alert.alert('Error', error.toString(), [
                { text: 'OK', onPress: dismiss },
            ]);
        }

        // Conditionally display an AdMob banner
        const banner = showAds ? (
            <AdMobBanner
              bannerSize="fullBanner"
              adUnitID={bannerId}
              testDeviceID="EMULATOR"
            />
        ) : null;

        // Conditionally display an Admob interstitial
        if (showAds && this.state.showInterstitial) {
            launchInterstitial();
            this.setState({ showInterstitial: false });
        }

        // Render the container
        return (
            <View style={styles.view} onLayout={load}>
                <Navigator navigation={navigation} />
                {banner}
            </View>
        );
    }
}

Application.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
    showAds: PropTypes.bool.isRequired,
    launchInterstitial: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    error: PropTypes.instanceOf(Error),
    dismiss: PropTypes.func.isRequired,
};

Application.defaultProps = {
    error: null,
};

const mapStateToProps = (state) => {
    const { navigation, purchases } = state;
    return {
        navigation,
        showAds: purchases.loaded && !purchases.removeAds,
        error: purchases.error,
    };
};

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(restorePurchases).catch(() => {}),
    dispatch,
    dismiss: () => dispatch(dismissError),
    launchInterstitial: () => dispatch(showInterstitial).catch(() => {}),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const navigationHelpers = addNavigationHelpers({
        dispatch: dispatchProps.dispatch,
        state: stateProps.navigation,
    });
    const result = assign({ }, ownProps, stateProps, dispatchProps);
    result.navigation = navigationHelpers;
    delete result.dispatch;
    return result;
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Application);
