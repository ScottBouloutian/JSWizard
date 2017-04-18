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
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Promise from 'bluebird';
import spark from '../images/spark.gif';

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
    spark: {
        position: 'absolute',
        width: '250%',
        height: '250%',
        top: '-75%',
        left: '-75%',
        opacity: 0.85,
    },
    view: {
        width: '100%',
        height: '100%',
    },
});

function wait(time) {
    return new Promise(resolve => setTimeout(() => resolve(), time));
}

class Spell extends Component {
    componentWillMount() {
        this.state = { sparks: false };
    }

    render() {
        const { title, subtitle } = this.props;
        const setState = Promise.promisify(this.setState, { context: this });
        const onPress = () => (
            setState({ sparks: true })
                .then(() => wait(600))
                .then(() => setState({ sparks: false }))
                .then(() => this.props.onPress())
        );
        const image = this.state.sparks ? (
            <Image style={styles.spark} source={spark} />
        ) : null;
        return (
            <TouchableOpacity style={styles.spell} onPress={onPress}>
                <View style={styles.view}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                    {image}
                </View>
            </TouchableOpacity>
        );
    }
}
Spell.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};
export default Spell;
