import React,
{ Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    AsyncStorage,
} from 'react-native';
import SessionLineGraph from '../components/SessionLineGraph';
import SessionCircleGraph from '../components/SessionCircleGraph';
import PersonalNotes from '../components/PersonalNotes';
const sessionLocation = '/sessions';

export default class GraphingScreen extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        const exercise = navigation.getParam('exercise', null);
        this.state = {
            exercise: exercise,
            sessions: null,
        }
    }

    //Load the exercise specific sessions on mount
    componentDidMount = () => {
        this.retrieveSessions(this.state.exercise);
    }

    //Saving the exercise specific sessions in async storage under the exercise title
    saveSessions = async (title, sessions) => {
        try {
            console.log("Saving session:");
            console.log(sessions);
            await AsyncStorage.setItem(title + sessionLocation, JSON.stringify(sessions));
        } catch (error) {
            console.warn(error);
        }
    }

    //Retireving the exercise specific sessions as well as setting them when loaded
    retrieveSessions = async (exercise) => {
        try {
            await AsyncStorage.getItem(exercise.title + sessionLocation)
                .then((response) =>{
                    let sessions = JSON.parse(response);
                    if (sessions === null) sessions = [];
                    this.setState({
                        sessions:sessions,
                    })
                });
        } catch (error) {
            console.warn(error);
        }
    }

    //Opening when the user clicks on 'add new session' button
    openCreateSessionScreen = () => {
        const {navigation} = this.props;
        const {exercise} = this.state;
        navigation.navigate('CreateSession', {
            weightType:exercise.weightType,
            exerciseTitle:exercise.title,
            goal:exercise.goal,
            createSession:this.createSession.bind(this),
        });
    }

    //When the fields in the CreateSessionScreen has been selected and the button pressed
    //It launches this function
    createSession = (result, date) => {
        const {sessions} = this.state;
        const newSession = {
            result: result,
            date: date,
        };
        const sessionList = sessions == null ? [] : sessions;
        if (sessionList.length === 0) {
            sessionList.push(newSession);
            this.saveAndSetSessions(sessionList);
        } else {
            this.sortSessionInList(sessionList, newSession);
        }
    }

    //Adds the session in the appropriate spot in the list based on the dates
    sortSessionInList = (sessionList, newSession) => {
        const newDate = newSession.date;
        for (const num in sessionList) {
            const oldSession = sessionList[num];
            oldDate = new Date(oldSession.date);
            if (newDate.getTime() <= oldDate.getTime()) {
                sessionList.splice(num, 0, newSession);
                break;
            } else {
                sessionList.push(newSession);
                break;
            }
        }
        this.saveAndSetSessions(sessionList);
    }

    //Saves and sets the sessions
    saveAndSetSessions(sessionList) {
        this.saveSessions(this.state.exercise.title, sessionList);
        this.setState({sessions:sessionList});
    }

    render() {
        const {sessions, exercise} = this.state;
        const weight = exercise.weightType === 'none' ? '' : exercise.weightType;
        //If there are no sessions the graphs will not be displayed.
        let sessionLineGraph = <View></View>;
        let sessionCircleGraph = <View></View>;
        if (sessions != null) {
            sessionLineGraph = <SessionLineGraph
                goal={exercise.goal}
                sessions={sessions} />
            sessionCircleGraph = <SessionCircleGraph
                goal={exercise.goal}
                sessions={sessions} />
        }
        return(
            <ScrollView>
                <View style={styles.container}>

                    <Text style={styles.title}>{exercise.title}</Text>
                    <Text>Your goal is {exercise.goal}{exercise.weight}, results:</Text>
                    {sessionLineGraph}
                    <Text>3 newest results compared to goal:</Text>
                    {sessionCircleGraph}
                    <PersonalNotes personalNotes={exercise.personalNotes} />
                    <Button 
                        title={'Add new Session'}
                        onPress={() => this.openCreateSessionScreen()}/>
                        
                </View>
            </ScrollView>
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