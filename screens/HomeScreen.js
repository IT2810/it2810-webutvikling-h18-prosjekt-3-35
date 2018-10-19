import React, { Component } from 'react';
import {
    ScrollView,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    AsyncStorage,
    Alert,
} from 'react-native';
import {
    Button,
} from 'react-native-paper';
import { PedometerProgressGraph } from '../components/PedometerGraph';
import { ExerciseCard } from '../components/ExerciseCard';
import { PedometerSensor } from '../components/PedometerSensor';
import { saveData } from '../constants/AsyncStorage';

const logoSource = '../assets/images/pmm.png';
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

    // The mount function launches retrieval for the daily goal as well as the exercises created.
    componentDidMount = () => this.retrieveData();

    //ExerciseNames is used to check if names are unique when creating a new exercise
    updateUniqueNames = (exerciseList) => {
        const exerciseNames = []
        for (const num in exerciseList) {
            const name = exerciseList[num].title;
            exerciseNames.push(name);
        }
        return exerciseNames;
    }

    //Uses a list of locations to retrieve the data. 
    retrieveData = async () => {
        const locations = [dailyGoalLocation, exerciseListsLocation];
        try {
            await AsyncStorage.multiGet(locations)
                .then((response) =>{
                    let dailyGoal = JSON.parse(response[0][1]);
                    let exerciseList = JSON.parse(response[1][1]);
                    dailyGoal = dailyGoal === null ? 10000 : dailyGoal;
                    exerciseList = exerciseList === null ? [] : exerciseList;
                    const exerciseNames = this.updateUniqueNames(exerciseList);
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

    //This function is sent down to PedometerSensor that updates the steps 
    updateSteps = (steps) => this.setState({stepsWalked:parseInt(steps,10)})

    //This function is sent down to StepGoalScreen to update the step goal, 
    //and saves the updated goal
    editStepGoal = (goal) => {
        this.setState({
            pedometerModalVisible: !this.state.pedometerModalVisible,
            stepGoal: parseInt(goal, 10),
        });
        saveData(dailyGoalLocation, goal);
    };
    
    //This function is sent down to CreateExerciseScreen and creates an exercise
    createExercise = (title, weightType, personalNotes, reps, sets, goal) => {
        const newExercise = {
            title: title,
            weightType: weightType, 
            personalNotes: personalNotes,
            reps: reps,
            sets: sets,
            goal: goal,
        };
        this.pushExerciseInList(newExercise)
    }

    pushExerciseInList(newExercise) {
        const exerciseLists = this.state.exercises;
        exerciseLists.push(newExercise);
        const exerciseNames = this.updateUniqueNames(exerciseLists);
        saveData(exerciseListsLocation, exerciseLists);
        this.setState({
            exercises:exerciseLists,
            exerciseNames:exerciseNames,
        });
    }
    

    //Opens the StepGoalScreen and sends down props and a function
    openStepGoalScreen = () => {
        this.props.navigation.navigate('StepGoal', {
            currentSteps: this.state.stepsWalked,
            stepGoal: this.state.stepGoal,
            acceptChange: this.editStepGoal.bind(this),
        })
    }

    //Opens the CreateExereciseScreen 
    openCreateExerciseScreen = () => {
        this.props.navigation.navigate('CreateExercise', {
            createExercise: this.createExercise.bind(this),
            exerciseNames: this.state.exerciseNames,
        })
    }

    
    //Creates the ExerciseCards that are rendered
    createExerciseCards = () => {
        const exerciseLists = this.state.exercises;
        const exerciseCards = [];
        for (const num in exerciseLists) {
            exerciseCards.push(
                <ExerciseCard
                    alertDelete={this.alertDelete.bind(this)}
                    key={num} 
                    index={num}
                    navigation={this.props.navigation}
                    exercise={exerciseLists[num]}/>
                );
        }
        return exerciseCards;
    };
    
    //Alert for deleting the specific exercise
    alertDelete = (index, title) => {
        Alert.alert(
            'Delete exercise?',
            'Do you want to delete ' + title + "?" ,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => {
                  this.deleteExercise(index, title);
                }},
            ],
            { cancelable: false }
          )
    }

    //Deletes the exercise and sessions from local storage
    deleteExercise = (index, title) => {
        const list = this.state.exercises;
        list.splice(index,1);
        saveData(exerciseListsLocation, list);
        saveData(title+'/sessions', []);
        const uniqueNames = this.updateUniqueNames(list);
        this.setState({
            exercises:list,
            exerciseNames:uniqueNames
        });
    }

    render() {
        const exerciseCards = this.createExerciseCards();
        return (
            <View style = {styles.container}>
                <View style = {styles.lineStyle}/>
                <ScrollView style = {styles.ScrollView} >
                    <TouchableOpacity onPress={() => this.openStepGoalScreen()}>
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
                            onPress={() => this.openCreateExerciseScreen()} >
                            <Button mode={'contained'} dark={true}>Add exercise</Button>
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
        backgroundColor: '#ecf8ff',
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
        alignSelf: 'stretch',
    },
    cardContainer: {
        flexDirection: 'column',
        padding: 8,
        justifyContent: 'space-between',
    }
});