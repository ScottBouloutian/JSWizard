import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Spell from '../components/Spell';
import { spells } from '../spells.json';

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
    },
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

class Home extends Component {
    static navigationOptions = {
        title: 'JSWizard',
        header: {
            tintColor: '#e74c3c',
        },
    };
    render() {
        const spellElements = spells.map(({ title, subtitle, article }) => (
            <Spell title={title} subtitle={subtitle} key={article} />
        ));
        return (
            <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
                {spellElements}
            </ScrollView>
        );
    }
}
export default connect()(Home);
