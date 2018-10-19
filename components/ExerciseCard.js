import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    Card,
    Title,
} from 'react-native-paper';

export class ExerciseCard extends Component {

    //Opens the exercise screen and sends down a prop
    openExerciseGraphScreen = (exercise) => {
        const {navigation} = this.props;
        navigation.navigate('ExerciseGraph', {
            exercise:exercise,
        });
    };

    render() {
        const {exercise, index, alertDelete} = this.props;
        return(
            <Card
                onLongPress={() => alertDelete(index, exercise.title)}
                onPress={() => this.openExerciseGraphScreen(exercise)}
                style={styles.card} theme={{ colors:{text: '#ecf8ff'}}}>
                <Card.Content>
                    <Title>{exercise.title}</Title>
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