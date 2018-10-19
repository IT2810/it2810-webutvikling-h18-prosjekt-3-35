import React, { Component } from 'react';
import { 
    View,
    Dimensions,
} from 'react-native';
import {
    ProgressChart,
} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width-40;
const chartConfig={
    backgroundGradientFrom: '#9497b8',
    backgroundGradientTo: '#b3b5cc',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};
export default class SessionCircleGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graphResults: [],
            sessionLength: null,
        }
        console.log(props);
    }

    //On mount it will iterate the sessions into only the results, retrieve the 3 last results, then set the state
    componentDidMount = () => {
        const { sessions } = this.props;
        this.prepareCircleDate(sessions);
    }

    //If the sessions has changed, update the graph
    componentDidUpdate = () => {
        const { sessions } = this.props;
        const { sessionLength } = this.state;
        if (sessions.length !== sessionLength) {
            this.prepareCircleDate(sessions);
        }
    }

    //Gets the 3 final results and sets state
    prepareCircleDate = (sessions) => {
        const sessionResults = this.iterateSessions(sessions);
        const circleData = this.getProgressCircleData(sessionResults);
        this.setState({
            graphResults:circleData,
            sessionLength:sessions.length,
        });
    }

    //Gets the last 3 results and sets it to max 100% if it is actually 1 the graph might not create a circle.
    getProgressCircleData = (results) => {
        const returnData = results.slice(-3);
        for (num in returnData) {
            const percent = returnData[num] / Number(this.props.goal);
            const indexPercent = percent > 1 ? 0.999 : percent
            returnData[num] = indexPercent;
        }
        return returnData;
    }

    //Goes through the sessions and getting only the results
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
            chartConfig={chartConfig}
            style={{
                marginVertical: 8,
                borderRadius: 2
            }}/>
        );
    }

}

