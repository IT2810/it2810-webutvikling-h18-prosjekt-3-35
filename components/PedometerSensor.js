import React, {
    Component
} from 'react';
import { Text, View } from 'react-native';
import { Pedometer, Expo } from 'expo';

export class PedometerSensor extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            pastStepCount: 0,
            currentStepCount: 0,
            isPedometerAvailable: 'Checking',
        }
    }

    componentDidMount = () => {
        this.subscribe();
        console.log("mounting pedometer");
    }
    
    componentWillUnmount = () => {
        this.unsubscribe();
        console.log("unmounting pedometer");
    }
    
    subscribe = async () => {
        this.subscription = Pedometer.watchStepCount(result => {
            console.log(result.steps)
            this.setState({currentStepCount: result.steps});
            console.log(this.state.pastStepCount + this.state.currentStepCount);
            this.props.updateSteps(this.state.pastStepCount + this.state.currentStepCount);
        });

        const end = new Date();
        const start = new Date();
        start.setHours(0,0,0,0);
        end.setHours(24,0,0,0);

        Pedometer.getStepCountAsync(start, end).then(
            result => {
                console.log(result.steps)
                this.setState({ pastStepCount: result.steps});
                this.props.updateSteps(this.state.pastStepCount);
            },
            error => {
                console.log("Pedometer getStepCountAsync Error: " + error)
            }
        );
    };
    
    unsubscribe = () => {
        this.subscription && this.subscription.remove();
        this.subscription = null;
    };

    updateSteps = (steps) => this.props.updateSteps(steps);

    render() {
        return (false);
      }
}