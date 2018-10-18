import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {
    ProgressCircle
} from 'react-native-svg-charts';

export class PedometerProgressGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
        }
    }

    componentDidMount = () => this.calculateProgress(this.props.stepsWalked, this.props.goal);

    componentDidUpdate = (prevProps) => {
        if (prevProps.goal !== this.props.goal || prevProps.stepsWalked !== this.props.stepsWalked) {
            this.calculateProgress(this.props.stepsWalked, this.props.goal);
        }
    }

    calculateProgress = (stepsWalked, goal) => this.setState({
        progress: (stepsWalked / goal)
    });

    goalText = () => {
        let returnText;
        if (this.state.progress === 1 || this.state.progress > 1) {
            returnText = <Text style={styles.resultText}>Du har nådd målet!</Text>
        } else {
            returnText = <View></View>
        }

        return (
            <View>
                <Text
                    style={styles.distance}>
                    {this.props.stepsWalked}
                </Text>
                {returnText}
            </View>
        );
    }

    render() {
        const goalResultText = this.goalText();
        return (
            <View>
                <ProgressCircle
                    style={styles.graph}
                    progress={ this.state.progress }
                    progressColor={'#5c92aa'}
                    startAngle={ -Math.PI * 0.8 }
                    endAngle={ Math.PI * 0.8 }
                />
                {goalResultText}
                <View style={styles.lineSeparator}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    graph: {
        height: 130,
        marginTop: 24,
    },
    distance: {
        textAlign: 'center',
        fontSize: 24,
    },
    lineSeparator: {
        alignSelf: 'stretch',
        borderWidth: 0.2,
        borderColor: 'black',
        marginTop: 5,
        marginBottom: 10,
    },
    resultText: {
        textAlign: 'center',
        fontSize: 30,
    }
});