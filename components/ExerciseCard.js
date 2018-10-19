import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import {
    Card,
    Title,
} from 'react-native-paper';

export class ExerciseCard extends Component {
    render() {
        return(
            <Card style={styles.card} theme={{ colors:{text: '#ecf8ff'}}}>
                <Card.Content>
                    <Title>{this.props.title}</Title>
                </Card.Content>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 2,
    }
});