import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { WebView } from 'react-native';
import empty from '../empty.html';

function Article({ html }) {
    return (
        <WebView source={html} />
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
