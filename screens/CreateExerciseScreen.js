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
        }
    }

    isButtonDisabled = () => {
        const titleString = this.state.title.toString();
        const repsString = this.state.reps.toString();
        const setsString = this.state.sets.toString();

        return titleString === '' ||  repsString === '' ||  setsString === '' ? true : false;
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

    createPersonalNotesView = () => {
        return (
            <View>
                <Text>Personal Notes:</Text>
                <TextInput 
                    onChangeText={(text) => this.setState({personalNotes:text})}/>
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

    createExerciseView = () => {
        return (
            <View>
                <Text>Exercise:</Text>
                <TextInput 
                    onChangeText={(text) => this.setState({title:text})}/>
            </View>
        );
    }

    createSetsView = () => {
        return (
            <View>
                <Text>Sets:</Text>
                <TextInput
                    keyboardType={'numeric'}
                    defaultValue={String(this.state.sets)}
                    onChangeText={(number) => {
                        this.setState({sets:number})
                    }}/>
            </View>
        );
    }

    createRepsView = () => {
        return (
            <View>
                <Text>Reps:</Text>
                <TextInput
                    keyboardType={'numeric'}
                    defaultValue={String(this.state.reps)}
                    onChangeText={(number) => this.setState({reps:number})}/>
            </View>
        );
    }

    create 

    render() {
        const disabledButton = this.isButtonDisabled();
        const {navigation} = this.props;
        const {params} = this.props.navigation.state;
        const exerciseView = this.createExerciseView();
        const weightTypePicker = this.createWeightTypePicker();
        const personalNotesView = this.createPersonalNotesView();
        const setsView = this.createSetsView();
        const repsView = this.createRepsView();
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