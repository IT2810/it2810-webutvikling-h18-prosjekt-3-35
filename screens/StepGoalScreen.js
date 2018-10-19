import 
    React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';

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
        const stepGoal = navigation.getParam('stepGoal', 10000)
        return(
            <View style={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.modalContainer}>

                        <View style={styles.stateText}>
                            <Text style={styles.text}>You have walked {currentSteps} steps</Text>
                            <Text style={styles.text}>Your daily goal is {stepGoal} steps</Text>
                        </View>

                        <View style={styles.textInputRow}>
                            <Text>Edit goal steps:</Text>  
                            <TextInput
                                style={styles.inputField}
                                defaultValue={String(stepGoal)}
                                keyboardType={'numeric'}
                                onChangeText={(number) => {
                                    this.setState({goal: number})
                                    this.updateDisabledbutton(number)
                                }}/>                            
                        </View>

                        <View style={styles.buttonRow}>
                            <Button 
                                disabled={this.state.disabledButton}
                                title={acceptButtonText}
                                onPress={() => {
                                    params.acceptChange(this.state.goal)
                                    navigation.goBack();
                                }}/>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#ecf8ff',
        flexDirection: 'column',
        flex: 1,
        paddingHorizontal: 20,
    },
    inputField: {
        padding: 5,
        textAlign: 'center',
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
    stateText: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
    },
    text:  {
        textAlign: 'center',
        fontSize: 20,
    }
});