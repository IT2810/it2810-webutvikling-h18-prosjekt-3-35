import React, 
    { Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Alert,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const twoWeekstime = 12096e5;

export default class GraphingScreen extends Component {
    constructor(props) {
        super(props);
        const today = new Date();
        today.setHours(23, 59, 0, 0);
        const fortnightAgo = new Date(today - twoWeekstime);
        fortnightAgo.setHours(0,0,0,0);
        this.state = {
            fromDate: fortnightAgo,
            toDate: today,
            clickedDate: null,
            clickedDateName: '',
            isDateTimePickerVisible: false,
        }
    }

    getTimeText = (date) => {
        const weekday = weekdays[date.getDay()];
        const month = months[date.getMonth()];
        return weekday + ' ' + date.getDate() + ' ' + month;
    }
    setDate = (date, name) => {
        (name === 'FromDate') ? this.setState({fromDate:date}) : this.setState({toDate:date})
        this.setState({isDateTimePickerVisible: !this.state.isDateTimePickerVisible,})
    }

    alertDateMessage = (message) => {
        Alert.alert(
            'Unvalid date',
            message,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
    }

    handleDatePicked = (date) => {
        if (this.state.clickedDateName === 'FromDate' && this.state.toDate.getTime() < date.getTime()) {
            const alertMessage = 'The from date cannot be set to be after the to date.';
            this.alertDateMessage(alertMessage);
        } else if (this.state.clickedDateName === 'ToDate' && date.getTime() < this.state.toDate.getTime()) {
            const alertMessage = 'The to date cannot be set to be earlier than the from date.';
            this.alertDateMessage(alertMessage);
        } else {
            (this.state.clickedDateName === 'FromDate') ? this.setState({fromDate:date}) : this.setState({toDate:date});
        }
        this.hideDateTimePicker();
    }

    showHideDatepicker = (name, date) => {
        this.setState({
            clickedDateName: name,
            clickedDate: date,
            isDateTimePickerVisible: !this.state.isDateTimePickerVisible,
        });
    }

    hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    render() {
        const {navigation} = this.props;
        const {params} = this.props.navigation.state;
        const fromDateText = this.getTimeText(this.state.fromDate);
        const toDateText = this.getTimeText(this.state.toDate);
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    {navigation.getParam('title', 'No exercise name')}
                </Text>
                <View style={styles.dateButtonRow}>
                    <TouchableOpacity onPress={()=> this.showHideDatepicker('FromDate', this.state.fromDate)}>
                        <Text style={styles.dateButton}>From: {fromDateText}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> this.showHideDatepicker('ToDate', this.state.toDate)}>
                        <Text style={styles.dateButton}>To: {toDateText}</Text>
                    </TouchableOpacity>
                </View>
                <Button 
                    title={'Add new Session'}
                    onPress={() => console.log("pressed")}/>
                <DateTimePicker
                    date = {this.state.clickedDate}
                    isVisible = {this.state.isDateTimePickerVisible}
                    onConfirm = {this.handleDatePicked}
                    onCancel = {this.hideDateTimePicker}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontSize: 18,
        textAlign: 'center',
    },
    dateButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dateButton: {
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'black',
    },
});