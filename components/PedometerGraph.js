import
React, {
    Component
} from 'react';
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
        const goalResutText = this.goalText();
        return (
            <View>
                <ProgressCircle
                    style={styles.graph}
                    progress={ this.state.progress }
                    progressColor={'rgb(134, 65, 244)'}
                    startAngle={ -Math.PI * 0.8 }
                    endAngle={ Math.PI * 0.8 }
                />
                {goalResutText}
                <View style={styles.lineSeperator}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    graph: {
        height: 130,
    },
    distance: {
        textAlign: 'center',
        fontSize: 24,
    },
    lineSeperator: {
        alignSelf: 'stretch',
        borderWidth: 0.2,
        borderColor: 'black',
        backgroundColor: 'lightgray',
        marginTop: 5,
        marginBottom: 10,
    },
    resultText: {
        textAlign: 'center',
        fontSize: 30,
    }
});