import React from 'react';
import {AsyncStorage, Image, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {PedometerProgressGraph} from '../components/PedometerGraph';
// import {AreaChartExample} from '../components/ExampleGraph';
import {ModalPedometerGoal} from '../components/ModalPedometerGoal';
import {ExerciseCards} from "../components/ExerciseCards";

const logoSource = '../assets/images/pmm.png';
const dailyGoal = 'dailyGoal';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pedometerModalVisible: false,
            stepsWalked: 1000,
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
    };

    retrievePedometerData = async (location) => {
        try {
            const values = await AsyncStorage.getItem(location);
            this.setState({
                exercises: (JSON.parse(values)),
            });
        } catch (error) {
            console.warn(error);
        }
    };

    showHidePedometerModal = () => this.setState({pedometerModalVisible: !this.state.pedometerModalVisible});

    editStepGoal = (goal) => {
        this.setState({
            pedometerModalVisible: !this.state.pedometerModalVisible,
            stepGoal: parseInt(goal, 10),
        });
        this.saveData(dailyGoal, goal);
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require(logoSource)}
                    style={styles.logo}/>
                <View style={styles.lineStyle}/>
                <ScrollView style={styles.ScrollView}>
                    <TouchableOpacity onPress={() => this.showHidePedometerModal()}>
                        <PedometerProgressGraph
                            stepsWalked={this.state.stepsWalked}
                            goal={this.state.stepGoal}/>
                    </TouchableOpacity>
                    <ExerciseCards/>
                </ScrollView>
                <ModalPedometerGoal
                    visible={this.state.pedometerModalVisible}
                    hideModal={this.showHidePedometerModal.bind(this)}
                    acceptChange={this.editStepGoal.bind(this)}
                    goal={this.state.stepGoal}
                    steps={this.state.stepsWalked}/>
            </View>
        );
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
        position: 'absolute',
        zIndex:1000,
        top: 38,
        marginTop: 18,
        marginBottom: 5,
        height: 100,
        width: 105
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
    card: {
        marginBottom: 2,
    }
});