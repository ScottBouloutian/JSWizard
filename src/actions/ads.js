import { AdMobInterstitial } from 'react-native-admob';
import Promise from 'bluebird';

const interstitialId = 'ca-app-pub-4400088783500800/9047066979';
AdMobInterstitial.setAdUnitID(interstitialId);
AdMobInterstitial.setTestDeviceID('EMULATOR');
const requestAd = () => new Promise(resolve => AdMobInterstitial.requestAd(() => resolve()));
const showAd = () => new Promise(resolve => AdMobInterstitial.showAd(() => resolve()));

export const SHOW_INTERSTITIAL = 'SHOW_INTERSTITIAL';
export const showInterstitial = dispatch => (
    dispatch({
        type: SHOW_INTERSTITIAL,
        payload: requestAd().then(() => showAd()),
    })
);
