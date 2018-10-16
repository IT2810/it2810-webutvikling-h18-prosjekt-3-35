import React, 
    { Component
} from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Text,
    TextInput,
    Keyboard,
    Picker,
    Button,
    ScrollView,
} from 'react-native';

const acceptButtonText = 'OK';
const weightTypes = [
    {title: 'Kilograms', value: 'kg'},
    {title: 'Pounds', value: 'pounds'},
    {title: 'No Weight', value: 'none'},
]

export default class CreateExerciseScreen extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            title: '',
            weightType: 'kg',
            personalNotes: '',
            reps: 8,
            sets: 3,
            goal: '',
        }
    }

    isButtonDisabled = () => {
        const titleString = this.state.title.toString();
        const repsString = this.state.reps.toString();
        const setsString = this.state.sets.toString();
        const goalString = this.state.goal.toString();

        return titleString === '' || 
            repsString === '' ||  
            setsString === '' ||
            goalString === '' ? true : false;
    }

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
    }

    createTextInputView = (keyboardType, defaultValue, title, state) => {
        return (
            <View>
                <Text>{title}:</Text>
                <TextInput 
                    onChangeText={(input) => this.setState({[state]:input})}
                    keyboardType={keyboardType}
                    defaultValue={defaultValue}/>
            </View>
        );
    
    }

    createWeightTypePicker = () => {
        const pickerWeightList = this.PickerWeightList();
        return (
            <View>
                <Text>Weight:</Text>
                <Picker
                    selectedValue={this.state.weightType}
                    onValueChange={(itemValue) => this.setState({weightType: itemValue})}>
                    {pickerWeightList}
                </Picker>
            </View>
        );
    }

    create 

    render() {
        const disabledButton = this.isButtonDisabled();
        const {navigation} = this.props;
        const {params} = this.props.navigation.state;
        const weightTypePicker = this.createWeightTypePicker();
        const personalNotesView = this.createTextInputView('default', '', 'Personal Notes', 'personalNotes');
        const exerciseView = this.createTextInputView('default', '', 'Exercise Name', 'title');
        const setsView = this.createTextInputView('numeric', String(this.state.sets), 'Sets', 'sets');
        const repsView = this.createTextInputView('numeric', String(this.state.reps), 'Reps', 'reps');
        const goalView = this.createTextInputView('numeric', '', 'Weight Goal', 'goal')
        return (
            <ScrollView>
                <TouchableWithoutFeedback 
                    onPress={Keyboard.dismiss} accessible={false}
                    >
                    <View
                    style={styles.container}>
                        
                        {exerciseView}
                        {weightTypePicker}
                        {setsView}
                        {repsView}
                        {personalNotesView}
                        {goalView}

                        <Button 
                            disabled={disabledButton}
                            title={acceptButtonText}
                            onPress={() => {
                                params.createExercise(
                                    this.state.title,
                                    this.state.weightType, 
                                    this.state.personalNotes,
                                    this.state.reps,
                                    this.state.sets,
                                    this.state.goal,
                                    );
                                navigation.goBack();
                            }}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});