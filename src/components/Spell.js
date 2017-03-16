import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    spell: {
        width: 85,
        height: 85,
        backgroundColor: '#2980b9',
        borderRadius: 8,
        margin: 8,
        padding: 8,
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowColor: '#7f8c8d',
        shadowOpacity: 0.5,
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

function Spell({ title, subtitle, onPress }) {
    return (
        <TouchableOpacity style={styles.spell} onPress={onPress}>
            <View style={styles.view}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </TouchableOpacity>
    );
}
Spell.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};
export default Spell;
