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

import React, { PropTypes, Component } from 'react';
import { ScrollView, Image, View, Text, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spell from '../components/Spell';
import spells from '../spells';
import wizardImage from '../images/wizard.png';
import wand from '../images/wand.png';

const getItem = Promise.promisify(AsyncStorage.getItem, { context: AsyncStorage });
const setItem = Promise.promisify(AsyncStorage.setItem, { context: AsyncStorage });

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    spellbook: {
        position: 'absolute',
        bottom: 0,
        height: '100%',
        width: '100%',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 100,
        paddingBottom: 16,
    },
    wizard: {
        width: 70,
        height: 70,
    },
    message: {
        width: '60%',
        color: '#2c3e50',
        margin: 8,
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2c3e50',
        overflow: 'hidden',
        opacity: 0.9,
    },
    header: {
        backgroundColor: '#e74c3c',
    },
    spacer: {
        width: '100%',
        height: 100,
    },
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 16,
    },
    spellCasts: {
        color: '#ecf0f1',
        marginRight: 8,
    },
    wand: {
        width: 16,
        height: 16,
    },
    info: {
        margin: 16,
    },
});

class Home extends Component {
    componentWillMount() {
        const { setNavigationState } = this.props;
        setNavigationState();
    }

    render() {
        const { castSpell } = this.props;
        const spellElements = spells.map((spell) => {
            const { title, subtitle, html } = spell;
            return (
                <Spell title={title} subtitle={subtitle} key={html} onPress={castSpell(spell)} />
            );
        });
        return (
            <View style={styles.view}>
                <ScrollView style={styles.spellbook} contentContainerStyle={styles.container}>
                    {spellElements}
                    <View style={styles.spacer} />
                </ScrollView>
                <View style={styles.footer}>
                    <Image style={styles.wizard} source={wizardImage} resizeMode="contain" />
                    <Text style={styles.message}>
                        Welcome my JS Apprentice! Cast a spell to learn more about its power.
                    </Text>
                </View>
            </View>
        );
    }
}
Home.propTypes = {
    setNavigationState: PropTypes.func.isRequired,
    castSpell: PropTypes.func.isRequired,
};
Home.navigationOptions = {
    title: 'JSWizard',
    header: ({ state }) => {
        const params = state.params || { };
        const { spellCasts, navigateInfo } = params;
        return {
            tintColor: '#ecf0f1',
            style: styles.header,
            left: (
                <TouchableOpacity style={styles.info} onPress={navigateInfo}>
                    <Icon name="info-circle" size={16} color="#ecf0f1" />
                </TouchableOpacity>
            ),
            right: (
                <View style={styles.headerRight}>
                    <Text style={styles.spellCasts}>{spellCasts}</Text>
                    <Image style={styles.wand} source={wand} resizeMode="contain" />
                </View>
            ),
        };
    },
};
const mapStateToProps = (state, { navigation }) => ({
    castSpell: spell => () => {
        const route = state.navigation.routes[0];
        const params = route.params || { };
        const spellCasts = (params.spellCasts || 0) + 1;
        navigation.setParams({ spellCasts });
        navigation.navigate('Article', { spell });
        setItem('spellCasts', spellCasts.toString());
    },
    setNavigationState: () => {
        getItem('spellCasts').then((value) => {
            const spellCasts = Number(value || 0);
            const navigateInfo = () => navigation.navigate('Info');
            navigation.setParams({
                spellCasts,
                navigateInfo,
            });
        });
    },
});
export default connect(mapStateToProps)(Home);
