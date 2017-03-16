import React, { PropTypes } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Spell from '../components/Spell';
import { spells } from '../spells.json';
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
        width: '100%',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 100,
        paddingBottom: 16,
        borderTopWidth: 1,
        borderColor: '#bdc3c7',
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
    },
});

function Home({ spellPress }) {
    const spellElements = spells.map(({ title, subtitle, article }) => (
        <Spell title={title} subtitle={subtitle} key={article} onPress={spellPress(article)} />
    ));
    return (
        <View style={styles.view}>
            <ScrollView style={styles.spellbook} contentContainerStyle={styles.container}>
                {spellElements}
            </ScrollView>
            <View style={styles.footer}>
                <Image style={styles.wizard} source={wizardImage} resizeMode="contain" />
                <Text style={styles.message}>
                    Welcome my JS Apprentice! Cast a spell to learn more.
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
        tintColor: '#e74c3c',
    },
};
const mapDispatchToProps = dispatch => ({
    spellPress: article => () => dispatch({ type: 'spellPress', article }),
});
export default connect(null, mapDispatchToProps)(Home);
