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
            sessionResultsY: [],
        }
    }

    componentDidMount = () => this.iterateSessions();

    componentDidUpdate = () => {
        if (this.props.sessions.length !== this.state.sessionDatesX.length) {
            this.iterateSessions();
        }
    }

    iterateSessions = () => {
        const sessions = this.props.sessions;
        const sessionDates = [];
        const sessionResults = [];
        for (const num in sessions) {
            const session = sessions[num];
            sessionDates.push(this.getTimeText(session.date));
            sessionResults.push(Number(session.result));
        }
        this.setState({
            sessionDatesX:sessionDates,
            sessionResultsY:sessionResults,
        })
    }

    getTimeText = (date) => {
        date = new Date(date);
        const weekday = weekdays[date.getDay()];
        const month = months[date.getMonth()];
        return weekday + ' ' + date.getDate() + ' ' + month;
    }

    render() {
        const { sessionDatesX, sessionResultsY } = this.state;
        if (sessionDatesX.length === 0) {
            return(false);
        }
        const lineData = {
            labels: sessionDatesX,
            datasets: [{data: sessionResultsY}, ]
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