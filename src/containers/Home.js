import React, { PropTypes, Component } from 'react';
import { ScrollView, Image, View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Promise from 'bluebird';
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
});

class Home extends Component {
    componentWillMount() {
        const { getSpellCasts } = this.props;
        getSpellCasts();
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
    getSpellCasts: PropTypes.func.isRequired,
    castSpell: PropTypes.func.isRequired,
};
Home.navigationOptions = {
    title: 'JSWizard',
    header: ({ state }) => {
        const spellCasts = state.params ? state.params.spellCasts : 0;
        return {
            tintColor: '#ecf0f1',
            style: styles.header,
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
    getSpellCasts: () => {
        getItem('spellCasts').then((value) => {
            const spellCasts = Number(value || 0);
            navigation.setParams({ spellCasts });
        });
    },
});
export default connect(mapStateToProps)(Home);
