import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    spell: {
        width: 85,
        minWidth: 85,
        height: 85,
        backgroundColor: '#2980b9',
        borderRadius: 8,
        margin: 8,
        padding: 8,
    },
    title: {
        color: '#ecf0f1',
        fontSize: 13,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#bdc3c7',
        fontSize: 11,
    },
});

function Spell({ title, subtitle }) {
    return (
        <View style={styles.spell}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
}
Spell.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
};
export default Spell;
