import React, { Component } from 'react';
import { 
    View,
    Dimensions,
} from 'react-native';
import {
    ProgressChart,
} from 'react-native-chart-kit';

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
export default class SessionCircleGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graphResults: [],
            sessionLength: null,
        }
        console.log(props);
    }

    componentDidMount = () => {
        const { sessions } = this.props;
        const sessionResults = this.iterateSessions(sessions);
        const circleData = this.getProgressCircleData(sessionResults);
        this.setState({
            graphResults:circleData,
            sessionLength:sessions.length,
        });
    }

    componentDidUpdate = () => { //forever updating state, because sessions.lenght !== graphresults.length 
        const { sessions } = this.props;
        const { sessionLength } = this.state;
        if (sessions.length !== sessionLength) {
            const sessionResults = this.iterateSessions(sessions);
            const circleData = this.getProgressCircleData(sessionResults);
            this.setState({
                graphResults:circleData,
                sessionLength:sessions.length,
            });
        }
    }

    getProgressCircleData = (results) => {
        const returnData = results.slice(-3);
        for (num in returnData) {
            const percent = returnData[num] / Number(this.props.goal);
            const indexPercent = percent > 1 ? 0.999 : percent
            returnData[num] = indexPercent;
        }
        return returnData;
    }

    iterateSessions = (sessions) => {
        const sessionResults = [];
        for (const num in sessions) {
            const session = sessions[num];
            sessionResults.push(Number(session.result));
        }
        return sessionResults;
    }

    render() {
        const {graphResults} = this.state;
        if (graphResults.length === 0) {
            return (false);
        }
        return(
        <ProgressChart
            data={graphResults}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}/>
        );
    }

}

