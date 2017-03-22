import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { WebView, StyleSheet, View } from 'react-native';
import empty from '../empty.html';

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#ecf0f1',
        width: '100%',
        height: '100%',
    },
    web: {
        backgroundColor: '#ecf0f1',
    },
});

function Article({ html }) {
    return (
        <View style={styles.view}>
            <WebView style={styles.web} source={html} />
        </View>
    );
}
Article.navigationOptions = {
    title: ({ state }) => state.params.spell.title,
};
Article.propTypes = {
    html: PropTypes.number,
};
Article.defaultProps = {
    html: empty,
};
const mapStateToProps = (state) => {
    const routes = state.navigation.routes;
    if (routes.length !== 2) {
        return { };
    }
    const params = routes[routes.length - 1].params;
    const { html } = params.spell;
    return { html };
};
export default connect(mapStateToProps)(Article);
