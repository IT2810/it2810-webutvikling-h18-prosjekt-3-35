import React, 
    { Component
} from 'react';
import {
    ScrollView,
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import { PedometerProgressGraph } from '../components/PedometerGraph';
import { ExerciseCard } from '../components/ExerciseCard';
import { PedometerSensor } from '../components/PedometerSensor';

const logoSource = '../assets/images/pmm.png';
const addExerciseButton = '../assets/images/plus.png';
const dailyGoalLocation = 'dailyGoal';
const exerciseListsLocation = 'exerciseCards';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepsWalked: 1000,
            stepGoal: 10000,
            exercises: [],
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
    }

    retrieveData = async (locations) => {
        try {
            await AsyncStorage.multiGet(locations)
                .then((response) =>{
                    let dailyGoal = JSON.parse(response[0][1]);
                    let exerciseList = JSON.parse(response[1][1]);
                    if (dailyGoal === null) {
                        dailyGoal = 10000;
                    }
                    if (exerciseList === null) {
                        exerciseList = [];
                    }
                    this.setState({
                        stepGoal:dailyGoal,
                        exercises:exerciseList,
                    })
                });
            
        } catch (error) {
            console.warn(error);
        }
    }

    updateSteps = (steps) => {
        this.setState({stepsWalked:parseInt(steps,10)})
      }

    editStepGoal = (goal) => {
        this.setState({
            pedometerModalVisible: !this.state.pedometerModalVisible,
            stepGoal: parseInt(goal, 10),
        });
        this.saveData(dailyGoalLocation, goal);
    }
    
    createExercise = (title, weightType, personalNotes, reps, sets, goal) => {
        const newExercise = {
            title: title,
            weightType: weightType, 
            personalNotes: personalNotes,
            reps: reps,
            sets: sets,
            goal: goal,
        }
        const exerciseLists = this.state.exercises;
        exerciseLists.push(newExercise);
        this.saveData(exerciseListsLocation, exerciseLists);
        this.setState({exercises:exerciseLists});
    }

    openExerciseScreen = (exercise) => {
        console.log(exercise.goal);
        this.props.navigation.navigate('ExerciseGraph', {
            title: exercise.title,
            weightType: exercise.weightType,
            personalNotes: exercise.personalNotes,
            reps: exercise.reps,
            sets: exercise.sets,
            goal: exercise.goal,
        });
    }

    createExerciseCards = () => {
        const exerciseLists = this.state.exercises;
        const exerciseCards = []
        //console.log(exerciseLists);
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
    }

    render() {
        const exerciseCards = this.createExerciseCards();
        return (
            <View style = {styles.container}>
                <Image 
                    source = {require(logoSource)}
                    style = {styles.logo}/>
                <View style = {styles.lineStyle}/>
                <ScrollView style = {styles.ScrollView} >
                    <TouchableOpacity onPress={() => 
                        this.props.navigation.navigate('StepGoal', {
                            currentSteps: this.state.stepsWalked,
                            stepGoal: this.state.stepGoal,
                            acceptChange: this.editStepGoal.bind(this),
                        })
                    }>
                        <PedometerProgressGraph 
                            stepsWalked={this.state.stepsWalked} 
                            goal={this.state.stepGoal} />
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity
                        style={styles.addExerciseView}
                        onPress={() =>
                            this.props.navigation.navigate('CreateExercise', {
                                createExercise: this.createExercise.bind(this)
                            })}>
                            <Text>Add exercise</Text>
                            <Image
                                //Icon made by wwww.flaticon.com/authors/freepik
                                source= {require(addExerciseButton)}
                                style= {styles.addExerciseSymbol}
                                />
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
        paddingHorizontal: 20,
    },
    logo: {
        marginTop: 18,
        marginBottom: 5,
        height: 100,
        width: 100
    },
    addExerciseView:  {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        backgroundColor: '#fff',
        padding: 5,
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
    lineStyle: {
        alignSelf: 'stretch',
        borderWidth: 3,
        borderColor: 'black',
        borderBottomColor: 'lightgray',
        backgroundColor: 'lightgray',
        marginBottom: 10,
    },
    cardContainer: {
        flexDirection: 'column',
        padding: 8,
        justifyContent: 'space-between',
    }
});