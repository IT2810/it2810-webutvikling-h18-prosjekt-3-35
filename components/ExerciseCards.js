import React, {Component} from 'react';
import {Card, Title} from "react-native-paper";
import {AsyncStorage, StyleSheet} from "react-native";

export class ExerciseCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: [
                {name: 'Markløft'},
                {name: 'Knebøy'},
                {name: 'Benkpress'}],
        }
    }

    // componentDidMount = () => this.retrieveExerciseData('exercises');

    retrieveExerciseData = async (location) => {
        try {
            const value = await AsyncStorage.getItem(location);
            this.setState({
                exercises: JSON.parse(value),
            });
        } catch (error) {
            console.warn(error);
        }
    };

    render() {
        return this.state.exercises.map(ex => (
            <Card style={styles.card} key={ex.name}>
                <Card.Content>
                    <Title>{ex.name}</Title>
                </Card.Content>
            </Card>
        ));
    }
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 2,
    }
});
