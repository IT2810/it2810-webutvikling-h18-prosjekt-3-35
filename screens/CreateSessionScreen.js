import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {
    Button,
    Text,
    TextInput,
} from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class CreateSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            goal: null,
            isDateTimePickerVisible:false,
        }
    }

    //Takes in a date and returns a text in the format (example) Mon 30 Jan
    getTimeText = (date) => {
        const weekday = weekdays[date.getDay()];
        const month = months[date.getMonth()];
        return weekday + ' ' + date.getDate() + ' ' + month;
    };

    //When a date is selected, set in state
    handleDatePicked = (date) => {
        this.setState({
            date:date,
            isDateTimePickerVisible:false,
        })
    };

    //Returns the values to the prop function and goes back to the previous screen
    createSession = () => {
        const {navigation} = this.props;
        const {params} = this.props.navigation.state;
        params.createSession(
            this.state.goal,
            this.state.date,
        );
        navigation.goBack();
    }

    //Hides the date time picker by setting state
    hideDateTimePicker = () => this.setState({isDateTimePickerVisible:!this.state.isDateTimePickerVisible});

    render() {
        const {navigation} = this.props;
        const weightType = navigation.getParam('weightType','');
        const goal = navigation.getParam('goal', '');
        const dateButtonText = this.state.date !== null ? this.getTimeText(this.state.date) : 'Select Date';
        const today = this.state.date === null ? new Date() : this.state.date;
        const buttonIsDisabled = (this.state.goal === null || this.state.date === null);
        const buttonColor = buttonIsDisabled ? '#8dc2dc' : '#5c92aa';
        
        return (
            <ScrollView style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss} accessible={false}>
                    <View>
                        <View>
                            <Text style={styles.title}>How close were you to your goal of:</Text>
                            <Text style={styles.subtitle}>{goal} {weightType}</Text>
                            <TextInput
                                keyboardType={'numeric'}
                                value={this.state.goal}
                                label={'Session result'}
                                mode={'outlined'}
                                onChangeText={(text) => {
                                    if (text === '') {
                                        text = null;
                                    }
                                    this.setState({goal:text})}}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => this.setState({isDateTimePickerVisible:true})}
                        >
                            <Button
                                mode={'outlined'}
                                style={styles.dateButton}
                            >
                                {dateButtonText}
                            </Button>
                        </TouchableOpacity>

                        <DateTimePicker
                            date = {today}
                            isVisible = {this.state.isDateTimePickerVisible}
                            onConfirm = {this.handleDatePicked}
                            onCancel = {this.hideDateTimePicker}/>

                        <Button
                            dark={true}
                            mode={'contained'}
                            disabled={buttonIsDisabled}
                            style={{marginTop: 4, backgroundColor: buttonColor}}
                            onPress={() => this.createSession()}
                        >
                            Add session to exercise
                        </Button>
                    </View>

                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ecf8ff',
    },
    dateButton: {
        borderColor: '#5c92aa',
        marginTop: 8,
        marginBottom: 8,
        padding: 10,
        alignContent: 'center',
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
});