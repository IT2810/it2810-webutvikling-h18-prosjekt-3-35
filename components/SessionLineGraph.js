import React, { Component } from 'react';
import { 
    View,
    Dimensions,
} from 'react-native';
import {
    LineChart,
} from 'react-native-chart-kit';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const screenWidth = Dimensions.get('window').width;
const chartConfig={
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    }
  }

  
export default class SessionLineGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionDatesX: [],
            sessionDatesXU: [],
            sessionResultsY: [],
        }
    }
    //On mount it will iterate the sessions and retrieve the dates and results in 3 lists
    componentDidMount = () => this.iterateSessions();

    //If the sessions has changed, update the graphs
    componentDidUpdate = () => {
        if (this.props.sessions.length !== this.state.sessionDatesX.length) {
            this.iterateSessions();
        }
    }

    //Goes through the sessions, creating 3 lists used for the graph
    //SessionDatesXU is just the date without the day and month
    iterateSessions = () => {
        const sessions = this.props.sessions;
        const sessionDates = [];
        const sessionDatesU = [];
        const sessionResults = [];
        for (const num in sessions) {
            const session = sessions[num];
            sessionDates.push(this.getTimeText(session.date));
            sessionDatesU.push(this.getTimeTextU(session.date));
            sessionResults.push(Number(session.result));
        }
        this.setState({
            sessionDatesX:sessionDates,
            sessionDatesXU:sessionDatesU,
            sessionResultsY:sessionResults,
        })
    }

    //Gets the date in the form Mon 1 Jan as a string
    getTimeText = (date) => {
        date = new Date(date);
        const weekday = weekdays[date.getDay()];
        const month = months[date.getMonth()];
        return weekday + ' ' + date.getDate() + ' ' + month;
    }

    //Gets the date in the from 17 (date between 1-31) as a string
    getTimeTextU = (date) => {
        date = new Date(date);
        return date.getDate();
    }

    render() {
        const {sessionDatesX, sessionResultsY, sessionDatesXU} = this.state;
        //If the sessions doesn't exist, don't display anything
        if (sessionDatesX.length === 0) {
            return (false);
        }
        let lineData;
        //If there are less than 4 sessions display the full text
        //Else only display the dates.
        if (sessionDatesX.length <= 4) {
            lineData = {
            labels: sessionDatesX,
            datasets: [{data: sessionResultsY},]
            }
        }
        else{
                lineData = {
                labels: sessionDatesXU,
                datasets: [{data: sessionResultsY},]
            }
        }

        return (
            <View>
                <LineChart
                    data={lineData}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}/>
            </View>
        );
    }
}