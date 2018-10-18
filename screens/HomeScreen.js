import React, { Component } from 'react';
import {
    ScrollView,
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import {
    Button,
} from 'react-native-paper';
import { PedometerProgressGraph } from '../components/PedometerGraph';
import { ExerciseCard } from '../components/ExerciseCard';
import {ExerciseCards} from "../components/ExerciseCards";
import { PedometerSensor } from '../components/PedometerSensor';

const logoSource = '../assets/images/pmm.png';
const addExerciseButton = '../assets/images/plus.png';
const dailyGoalLocation = 'dailyGoal';
const exerciseListsLocation = 'exerciseCards';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pedometerModalVisible: false,
            stepsWalked: 1000,
            stepGoal: 10000,
            exercises: [],
            exerciseNames: []
        }
    }

    static navigationOptions = {
        header: null,
    };


    componentDidMount = () => {
        this.retrieveData([dailyGoalLocation, exerciseListsLocation]);
    };

    saveData = async (location, data) => {
        try {
            await AsyncStorage.setItem(location, JSON.stringify(data));
        } catch (error) {
            console.warn(error);
        }
    };

    retrieveData = async (locations) => {
        try {
            await AsyncStorage.multiGet(locations)
                .then((response) =>{
                    let dailyGoal = JSON.parse(response[0][1]);
                    let exerciseList = JSON.parse(response[1][1]);
                    const exerciseNames = [];
              
                    if (dailyGoal === null) {
                        dailyGoal = 10000;
                    }
                    if (exerciseList === null) {
                        exerciseList = [];
                    }
                    for (const num in exerciseList) {
                        const name = exerciseList[num].title;
                        exerciseNames.push(name);
                    }
                    this.setState({
                        stepGoal:dailyGoal,
                        exercises:exerciseList,
                        exerciseNames:exerciseNames,
                    })
                });
        } catch (error) {
            console.warn(error);
        }
    };

    updateSteps = (steps) => {
        this.setState({stepsWalked:parseInt(steps,10)})
      };

    editStepGoal = (goal) => {
        this.setState({
            pedometerModalVisible: !this.state.pedometerModalVisible,
            stepGoal: parseInt(goal, 10),
        });
        this.saveData(dailyGoalLocation, goal);
    };
    
    createExercise = (title, weightType, personalNotes, reps, sets, goal) => {
        const newExercise = {
            title: title,
            weightType: weightType, 
            personalNotes: personalNotes,
            reps: reps,
            sets: sets,
            goal: goal,
        };
        const exerciseLists = this.state.exercises;
        exerciseLists.push(newExercise);
        this.saveData(exerciseListsLocation, exerciseLists);
        this.setState({exercises:exerciseLists});
    };

    openExerciseScreen = (exercise) => {
        this.props.navigation.navigate('ExerciseGraph', {
            exercise:exercise,
        });
    };

    createExerciseCards = () => {
        const exerciseLists = this.state.exercises;
        const exerciseCards = [];
        for (const num in exerciseLists) {
            exerciseCards.push(
                <TouchableOpacity 
                    key={num}
                    onPress={() => this.openExerciseScreen(exerciseLists[num])} >
                    <ExerciseCard 
                        title={exerciseLists[num].title}
                    />
                </TouchableOpacity>);
        }
        return exerciseCards;
    };

    render() {
        const exerciseCards = this.createExerciseCards();
        return (
            <View style = {styles.container}>
                <View style = {styles.lineStyle}/>
                <ScrollView style = {styles.ScrollView} >
                    <TouchableOpacity onPress={() => 
                        this.props.navigation.navigate('StepGoal', {
                            currentSteps: this.state.stepsWalked,
                            stepGoal: this.state.stepGoal,
                            acceptChange: this.editStepGoal.bind(this),
                        })
                    }>
                        <Image
                            source = {require(logoSource)}
                            style = {styles.logo}/>
                        <PedometerProgressGraph 
                            stepsWalked={this.state.stepsWalked} 
                            goal={this.state.stepGoal} />
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity
                        style={styles.addExerciseView}
                        onPress={() =>
                            this.props.navigation.navigate('CreateExercise', {
                                createExercise: this.createExercise.bind(this),
                                exerciseNames: this.state.exerciseNames,
                            })}>
                            <Button mode={'contained'} dark>Add exercise</Button>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardContainer}>
                        {exerciseCards}
                    </View>
                </ScrollView>
                {/*
                    <PedometerSensor 
                        updateSteps={this.updateSteps.bind(this)} 
                    />
                */}
            </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    logo: {
        position: 'absolute',
        zIndex:1000,
        top: 20,
        left: 105,
        marginTop: 18,
        marginBottom: 5,
        height: 100,
        width: 105
    },
    addExerciseView:  {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        paddingRight: 8,
    },
    addExerciseSymbol : {
        height: 25,
        width: 25,
        marginLeft: 5,
    },
    ScrollView: {
        backgroundColor: 'lightgray',
        alignSelf: 'stretch',
    },
    cardContainer: {
        flexDirection: 'column',
        padding: 8,
        justifyContent: 'space-between',
    }
});