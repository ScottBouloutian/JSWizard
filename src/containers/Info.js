import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import profile from '../images/profile.png';

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    },
    header: {
        backgroundColor: '#e74c3c',
    },
    profile: {
        width: 100,
        height: 100,
    },
    bio: {
        width: 200,
    },
});

function Info() {
    return (
        <View style={styles.view}>
            <Image style={styles.profile} source={profile} resizeMode="contain" />
            <Text style={styles.bio}>
                Hello World! My name is Scott Bouloutian and I am a software engineer with a
                passion for technology.
            </Text>
        </View>
    );
}
Info.navigationOptions = {
    title: 'Information',
    header: {
        tintColor: '#ecf0f1',
        style: styles.header,
    },
};
export default connect()(Info);
