import React, 
    { Component
} from 'react';
import {
    ScrollView,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import { DatePicker } from '../components/DatePicker';
import { PedometerProgressGraph } from '../components/PedometerGraph';
import { PedometerSensor } from '../components/PedometerSensor';

const logoSource = '../assets/images/pmm.png';
const dailyGoal = 'dailyGoal';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepsWalked: 0,
            stepGoal: 10000,
        }
    }
    static navigationOptions = {
        header: null,
    };

    componentDidMount = () => {
        this.retrieveData(dailyGoal);
        this.setState({stepsWalked:this.props.stepCount});
    };

    componentDidUpdate = (prevProps) => {
        if (prevProps.stepCount !== this.props.stepCount) {
            this.setState({stepsWalked:this.props.stepCount});
        }
    }

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
                    { /*TODO: put exercise list in here*/ } 
                </ScrollView>
                <PedometerSensor 
                    updateSteps={this.updateSteps.bind(this)} 
                />
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