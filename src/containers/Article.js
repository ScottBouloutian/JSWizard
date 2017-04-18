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
    header: {
        backgroundColor: '#e74c3c',
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
    header: {
        tintColor: '#ecf0f1',
        style: styles.header,
    },
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
