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
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class CreateSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            isDateTimePickerVisible:false,
        }
    }

    componentDidMount = () => {

    }

    getTimeText = (date) => {
        const weekday = weekdays[date.getDay()];
        const month = months[date.getMonth()];
        return weekday + ' ' + date.getDate() + ' ' + month;
    }

    handleDatePicked = (date) => {
        this.setState({
            date:date,
            isDateTimePickerVisible:false,
        })
    }

    hideDateTimePicker = () => this.setState({isDateTimePickerVisible:!this.state.isDateTimePickerVisible});

    render() {
        const {navigation} = this.props;
        const weightType = navigation.getParam('weightType','');
        const goal = navigation.getParam('goal', '');
        const dateButtonText = this.state.date !== null ? this.getTimeText(this.state.date) : 'Select Date';
        const today = this.state.date === null ? new Date() : this.state.date;
        console.log("Goal: " + goal);
        console.log("Weight: " + weightType);
        return (
            <ScrollView style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss} accessible={false}
                    >
                    <View>
                        <View>
                            <Text>How close were you to your goal of</Text>
                            <Text>{goal}{weightType}</Text>
                            <TextInput />
                        </View>
                        <TouchableOpacity
                            onPress={() => this.setState({isDateTimePickerVisible:true})}
                        >
                            <Text style={styles.dateButton}>{dateButtonText}</Text>
                        </TouchableOpacity>
                        <DateTimePicker
                                date = {today}
                                isVisible = {this.state.isDateTimePickerVisible}
                                onConfirm = {this.handleDatePicked}
                                onCancel = {this.hideDateTimePicker}
                            />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ecf8ff',
    },
    dateButton: {
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'black',
        alignContent: 'center',
    },
});