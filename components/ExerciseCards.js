import React, {Component} from 'react';
import {Card, Title} from "react-native-paper";
import {View, StyleSheet} from "react-native";

export class ExerciseCards extends Component {
    constructor(props) {
        super(props);
    }

    exercisesToCard = () => {
        const cardList = [];
        console.log("cardlist:", Array.isArray(cardList));
        let exercises = JSON.parse(this.props.exercises);
        console.log("exercises:", Array.isArray(exercises));
        console.log("exercises type: ", typeof exercises);
        for (let i = 0; i < exercises.length; i++){
            cardList.push(
                <Card style={styles.card} key={exercises[i].name}>
                    <Card.Content>
                        <Title>{exercises[i].name}</Title>
                    </Card.Content>
                </Card>
            )
        }
        //console.log(exercises);
        return cardList;
    };


    render() {
        const exercises = this.exercisesToCard();
        console.log(Array.isArray(exercises));
        // console.log(this.props.exercises);
        // const exercises = this.props.exercises;
        // console.log(exercises);
        // for (let i = 0; i < exercises.length; i++){
        //     console.log(exercises[i]);
        //     console.log(exercises[i].name);
        // // }
        // console.log(Array.isArray(exercises));
        // console.log('prop', typeof this.props.exercises);
        // console.log("HALLO?", exercises[0].name);
        // return exercises.map(ex => (
        //     <Card style={styles.card} key={ex.name}>
        //         <Card.Content>
        //             <Title>{ex.name}</Title>
        //         </Card.Content>
        //     </Card>
        // ));
        return (
            <View>
                {exercises}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 2,
    }
});
