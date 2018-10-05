import React from 'react';
import {AsyncStorage, Image, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Paragraph, Title} from 'react-native-paper';
import {PedometerProgressGraph} from '../components/PedometerGraph';
import {AreaChartExample} from '../components/ExampleGraph';
import {ModalPedometerGoal} from '../components/ModalPedometerGoal';

const logoSource = '../assets/images/pmm.png';
const dailyGoal = 'dailyGoal';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: ['Markløft', 'Knebøy', 'Benkpress'],
            pedometerModalVisible: false,
            stepsWalked: 1000,
            stepGoal: 10000,
        }
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount = () => this.retrieveData(dailyGoal);

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

    showHidePedometerModal = () => this.setState({pedometerModalVisible: !this.state.pedometerModalVisible});

    editStepGoal = (goal) => {
        this.setState({
            pedometerModalVisible: !this.state.pedometerModalVisible,
            stepGoal: parseInt(goal, 10),
        });
        this.saveData(dailyGoal, goal);
    }

    getExerciseCards = () => {
        return this.state.exercises.map(ex => (
            <Card key={ex}>
                <Card.Content>
                    <Title>{ex}</Title>
                </Card.Content>
            </Card>
        ));
    }

    render() {
        const exerciseList = this.getExerciseCards();
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
                    {exerciseList}
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
    }
});