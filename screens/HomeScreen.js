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
import { PedometerSensor } from '../components/PedometerSensor';

const logoSource = '../assets/images/pmm.png';
//const addExerciseButton = '../assets/images/plus.png';
const dailyGoal = 'dailyGoal';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepsWalked: 1000,
            stepGoal: 10000,
        }
    }
    static navigationOptions = {
        header: null,
    };


    componentDidMount = () => {
        this.retrieveData(dailyGoal);
    };

    saveData = async (location, data) => {
        try {
            await AsyncStorage.setItem(location, JSON.stringify(data));
        } catch (error) {
            console.warn(error);
        }
    }

    retrieveData = async (location) => {
        try {
            const value = await AsyncStorage.getItem(location);
            if (Number(JSON.parse(value)) === undefined) {
                value = 0;
            }
            this.setState({
                stepGoal: Number(JSON.parse(value))
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
        this.saveData(dailyGoal, goal);

    }
    
    createExercise = (title, weightType, personalNotes, reps, sets) => {
        console.log("Title: " + title);
        console.log("weightType: " + weightType);
        console.log("personalNotes: " + personalNotes);
        console.log("reps: " + reps);
        console.log("sets: " + sets);
    }

    render() {
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
                                source= {require(logoSource)}
                                style= {styles.addExerciseSymbol}
                                />
                        </TouchableOpacity>
                    </View>
                        { /*TODO: put exercise list in here*/ } 
                    
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
    }
});