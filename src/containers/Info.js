import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import profile from '../images/profile.png';
import SocialButton from '../components/SocialButton';

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
        borderRadius: 50,
        marginTop: 16,
        marginBottom: 8,
    },
    bio: {
        width: 200,
        margin: 8,
        textAlign: 'center',
    },
    name: {
        fontWeight: 'bold',
    },
});

function Info() {
    return (
        <View style={styles.view}>
            <Image style={styles.profile} source={profile} resizeMode="contain" />
            <Text style={styles.bio}>
                My name is
                <Text style={styles.name}> Scott Bouloutian </Text>
                and I am a software engineer with a passion for technology.
            </Text>
            <SocialButton icon="safari" text="www.ScottBouloutian.com" href="http://www.ScottBouloutian.com" />
            <SocialButton icon="github" text="ScottBouloutian" href="https://github.com/scottbouloutian" />
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
