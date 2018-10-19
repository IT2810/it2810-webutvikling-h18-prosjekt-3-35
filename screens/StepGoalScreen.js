import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import {
    Button,
    Text,
    TextInput,
} from 'react-native-paper';

const backButtonText = "Back";
const acceptButtonText = "OK";

export default class PedometerGoal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goal: this.props.goal,
            disabledButton: true,
        }
    }

    //A weird bug happenes if the ok button was pressed even if 
    //nothing was changed, so this enables the button on change
    componentDidUpdate = (prevProps) => {
        if (prevProps.goal !== this.props.goal) {
            this.setState({
                goal: this.props.goal,
                disabledButton: false,
            });
        }
    }

    //Checks if the OK button should be disabled or not
    updateDisabledbutton = (number) => {
        const buttonStatus = (this.state.goal === number || number === '') ? true:false ;
        this.setState({disabledButton:buttonStatus });
    }
    
    render() {
        const {navigation} = this.props;
        const {params} = this.props.navigation.state;
        const currentSteps = navigation.getParam('currentSteps', 0);
        const stepGoal = navigation.getParam('stepGoal', 10000);
        const buttonColor = this.state.disabledButton ? '#8dc2dc' : '#5c92aa';
        return(
            <View style={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.currentText}>You have walked {currentSteps} steps</Text>
                        <Text style={styles.goalText}>Your daily goal is {stepGoal} steps</Text>
                        <TextInput
                            keyboardType={'numeric'}
                            value={this.state.goal == null ? String(stepGoal) : this.state.goal}
                            label={'Edit step goal'}
                            mode={'outlined'}
                            onChangeText={(number) => {
                                this.setState({goal: number});
                                this.updateDisabledbutton(number)
                            }}
                        />
                        <Button
                            dark={true}
                            mode={'contained'}
                            disabled={this.state.disabledButton}
                            style={{marginTop: 4, backgroundColor: buttonColor}}
                            onPress={() => {
                                params.acceptChange(this.state.goal);
                                navigation.goBack();
                            }}
                        >
                            {acceptButtonText}
                        </Button>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#ecf8ff',
        flex: 1,
        paddingHorizontal: 20,
    },
    textInputRow: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    goalText: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 20,
    },
    currentText: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 16,
    },
});