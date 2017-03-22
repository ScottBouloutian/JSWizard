import React, { PropTypes } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Spell from '../components/Spell';
import spells from '../spells';
import wizardImage from '../images/wizard.png';

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
    title: {
        color: '#ecf0f1',
    },
    spacer: {
        width: '100%',
        height: 100,
    }
});

function Home({ spellPress }) {
    const spellElements = spells.map((spell) => {
        const { title, subtitle, html } = spell;
        return (
            <Spell title={title} subtitle={subtitle} key={html} onPress={spellPress(spell)} />
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
Home.propTypes = {
    spellPress: PropTypes.func.isRequired,
};
Home.navigationOptions = {
    title: 'JSWizard',
    header: {
        titleStyle: styles.title,
        style: styles.header,
    },
};
const mapDispatchToProps = dispatch => ({
    spellPress: spell => () => {
        const action = NavigationActions.navigate({
            routeName: 'Article',
            params: { spell },
        });
        dispatch(action);
    },
});
export default connect(null, mapDispatchToProps)(Home);
