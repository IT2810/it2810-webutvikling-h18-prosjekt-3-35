import React from 'react';
import {
    Platform,
    ScrollView,
    Image,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import {
    DatePicker
} from '../components/DatePicker';
import {
    PedometerProgressGraph
} from '../components/PedometerGraph';
import {
    ModalPedometerGoal
} from '../components/ModalPedometerGoal';

const logoSource = '../assets/images/pmm.png';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pedometerModalVisible: false,
            stepsWalked: 1000,
            stepGoal: 500,
        }
    }
    static navigationOptions = {
        header: null,
    };


    showHidePedometerModal = () => this.setState({pedometerModalVisible: !this.state.pedometerModalVisible});

    editStepGoal = (goal) => {
        this.setState({
        pedometerModalVisible: !this.state.pedometerModalVisible,
        stepGoal: parseInt(goal, 10),
    })
    console.log(goal);
}

    render() {
        return (
            <View style = {styles.container}>
                <Image 
                    source = {require(logoSource)}
                    style = {styles.logo}/>
                <View style = {styles.lineStyle}/>
                <ScrollView style = {styles.ScrollView} >
                    <TouchableOpacity onPress={() => this.showHidePedometerModal()}>
                        <PedometerProgressGraph 
                            stepsWalked={this.state.stepsWalked} 
                            goal={this.state.stepGoal} />
                    </TouchableOpacity>
                    { /*TODO: put exercise list in here*/ } 
                </ScrollView>
                <ModalPedometerGoal 
                    visible={this.state.pedometerModalVisible}
                    hideModal={this.showHidePedometerModal.bind(this)}
                    acceptChange={this.editStepGoal.bind(this)}
                    goal={this.state.stepGoal}
                    steps={this.state.stepsWalked}/>
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