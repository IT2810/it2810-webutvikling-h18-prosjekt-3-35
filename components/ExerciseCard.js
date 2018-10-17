import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {
    Card,
    Title,
} from 'react-native-paper';


export class ExerciseCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Card style={styles.card}>
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