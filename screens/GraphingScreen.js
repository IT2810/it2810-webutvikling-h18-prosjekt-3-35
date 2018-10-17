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
    AsyncStorage,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const twoWeekstime = 12096e5;
const sessionLocation = '/sessions';

export default class GraphingScreen extends Component {
    constructor(props) {
        super(props);
        const today = new Date();
        today.setHours(23, 59, 0, 0);
        const fortnightAgo = new Date(today - twoWeekstime);
        fortnightAgo.setHours(0,0,0,0);
        const {navigation} = this.props;
        const exercise = navigation.getParam('exercise', null);
        this.state = {
            fromDate: fortnightAgo,
            toDate: today,
            clickedDate: null,
            clickedDateName: '',
            isDateTimePickerVisible: false,
            exercise: exercise,
            sessions: []
        }
    }

    componentDidMount = () => {
        this.retrieveSessions(this.state.exercise);
    }

    saveSessions = async (title, sessions) => {
        console.log("Saving sessions: ");
        console.log(sessions)
        try {
            await AsyncStorage.setItem(title + sessionLocation, JSON.stringify(sessions));
        } catch (error) {
            console.warn(error);
        }
    }

    retrieveSessions = async (exercise) => {
        try {
    
            await AsyncStorage.getItem(exercise.title + sessionLocation)
                .then((response) =>{
                    let sessions = JSON.parse(response);
                    if (sessions === null) {
                        sessions = [];
                    }
                    this.setState({
                        sessions:sessions,
                        exercise:exercise
                    })
                });
        } catch (error) {
            console.warn(error);
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
            [{text: 'OK', onPress: () => console.log('OK Pressed')},],
            { cancelable: false }
          )
    }

    openCreateSessionScreen = () => {
        this.props.navigation.navigate('CreateSession', {
            weightType:this.state.exercise.weightType,
            exerciseTitle:this.state.exercise.title,
            goal:this.state.exercise.goal,
            createSession:this.createSession.bind(this),
        });
    }

    createSession = (result, date) => {
        const newSession = {
            result: result,
            date: date,
        };
        const sessionList = this.state.sessions;
        sessionList.push(newSession);
        this.saveSessions(this.state.exercise.title, sessionList)
        this.setState({sessions:sessionList});
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
        if (this.state.exercise === null) {
            return (false)
        }
        const fromDateText = this.getTimeText(this.state.fromDate);
        const toDateText = this.getTimeText(this.state.toDate);
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    {this.state.exercise.title}
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
                    onPress={() => this.openCreateSessionScreen()}/>
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