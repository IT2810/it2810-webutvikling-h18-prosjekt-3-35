import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Picker,
    ScrollView,
    Alert,
} from 'react-native';
import {
    Button,
    RadioButton,
    Text,
    TextInput,
} from 'react-native-paper';

const acceptButtonText = 'OK';
const weightTypes = [
    {title: 'Kilograms', value: 'kg'},
    {title: 'Pounds', value: 'pounds'},
    {title: 'No Weight', value: 'none'},
];

export default class CreateExerciseScreen extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            title: '',
            weightType: 'kg',
            personalNotes: '',
            reps: '8',
            sets: '3',
            goal: '',
        }
    }

    //Checks if the button to allow the creation of an exercise should be disabled or not
    isButtonDisabled = () => {
        const { title, reps, sets, goal } = this.state;
        const titleString = title.toString();
        const repsString = reps.toString();
        const setsString = sets.toString();
        const goalString = goal.toString();

        return titleString === '' ||
            repsString === '' ||
            setsString === '' ||
            goalString === '';
    };

    //Creates a list of picker items based on the array WeightTypes
    PickerWeightList = () => {
        const pickerList = [];
        for (weight in weightTypes) {
            pickerList.push(
                <Picker.Item 
                    key={weight}
                    label={weightTypes[weight].title} 
                    value={weightTypes[weight.value]} />
            );  
        }
        return pickerList;
    };

    //A general function that returns a text and and a textinput
    createTextInputView = (keyboardType, defaultValue, title, fieldName) => {
        return (
            <View>
                <TextInput
                    keyboardType={keyboardType}
                    value={this.state[fieldName] == null ? defaultValue : this.state[fieldName]}
                    label={title}
                    onChangeText={(input) => this.setState({[fieldName]:input})}
                    mode={'outlined'}
                    />
            </View>
        );
    
    };

    //Creates a picker based on the picker items that lets the user select a weight type
    createWeightRadioButtons = () => {
        return (
            <View style={styles.radiobuttons}>
                <Text>Weight:</Text>
                <View style={styles.radiobuttons}>
                    {this.createRadioButton('kg', 'KG')}
                    {this.createRadioButton('lbs', 'Lbs')}
                    {this.createRadioButton('none', 'No Weight')}
                </View>
            </View>
        );
    };

    createRadioButton = (weight, text) => {
        const {weightType} = this.state;
        return (
            <View>
                <Text style={styles.radioLabel}>{text}</Text>
                <RadioButton
                    value={weight}
                    status={weightType === weight ? 'checked' : 'unchecked'}
                    onPress={() => {this.setState({weightType: weight}); }}
                />
            </View>
        );
    }

    //When the OK has been selected it either sends an alert message about
    //the name not being unqiue or sends the exercise details as well as
    //returning to the previous screen
    buttonPressed = () => {
        const uniqueNames = this.props.navigation.getParam('exerciseNames', []);
        const {navigation} = this.props;
        const {params} = this.props.navigation.state;
        const {title, weightType, personalNotes, reps, sets, goal } = this.state;
        console.log(uniqueNames);
        console.log(uniqueNames.includes(title))
        if (uniqueNames.includes(title)) {
            this.alertNameMessage();
        } else {
            params.createExercise( 
                title,
                weightType, 
                personalNotes,
                reps,
                sets,
                goal,
                );
            navigation.goBack();
        }
    };

    //Alerts that the exercise name is taken
    alertNameMessage = () => {
        Alert.alert(
            'Exercise already exists',
            'An exercise needs a unique name',
            [{text: 'OK', onPress: () => console.log('OK Pressed')},],
            { cancelable: false }
          )
    };

    render() {
        const {sets, reps} = this.state;
        const disabledButton = this.isButtonDisabled();
        const weightTypePicker = this.createWeightRadioButtons();
        const personalNotesView = this.createTextInputView('default', '', 'Personal Notes', 'personalNotes');
        const exerciseView = this.createTextInputView('default', '', 'Exercise Name', 'title');
        const setsView = this.createTextInputView('numeric', String(sets), 'Sets', 'sets');
        const repsView = this.createTextInputView('numeric', String(reps), 'Reps', 'reps');
        const goalView = this.createTextInputView('numeric', '', 'Weight Goal', 'goal')
        return (
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                <TouchableWithoutFeedback 
                    accessible={false}
                    >
                    <View>
                        
                        {exerciseView}
                        {weightTypePicker}
                        {setsView}
                        {repsView}
                        {personalNotesView}
                        {goalView}

                        <Button
                            mode={'contained'}
                            disabled={disabledButton}
                            style={styles.button}
                            title={acceptButtonText}
                            onPress={() => this.buttonPressed()}
                        >
                            {acceptButtonText}
                        </Button>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ecf8ff',
    },
    button:{
        marginTop: 4,
    },
    radiobuttons:{
        flexDirection: 'row',
    },
    radioLabel:{
        alignSelf: 'center',
    },
});