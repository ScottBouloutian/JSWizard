import React, { PropTypes } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    touchable: {
        width: 224,
        height: 40,
        margin: 8,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e74c3c',
        padding: 16,
        borderRadius: 8,
    },
    text: {
        color: '#ecf0f1',
        textAlign: 'center',
        width: '100%',
    },
});

function SocialButton({ icon, text, href }) {
    const onPress = () => Linking.openURL(href);
    return (
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <View style={styles.button}>
                <Icon name={icon} color="#ecf0f1" />
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}
SocialButton.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
};
export default SocialButton;
