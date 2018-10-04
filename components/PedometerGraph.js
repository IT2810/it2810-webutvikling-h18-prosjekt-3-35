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

    componentDidMount() {
        this.calculateProgress(this.props.stepsWalked, this.props.goal);
    };

    calculateProgress = (stepsWalked, goal) => this.setState({
        progress: (stepsWalked / goal)
    });

    render() {
        return (
            <View>
                <ProgressCircle
                    style={styles.graph}
                    progress={ this.state.progress }
                    progressColor={'rgb(134, 65, 244)'}
                    startAngle={ -Math.PI * 0.8 }
                    endAngle={ Math.PI * 0.8 }
                />
                <Text
                        style={styles.distance}>
                    {this.props.stepsWalked}
                </Text>
                <View style={styles.lineSeperator}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    graph: {
        height: 150,
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
});