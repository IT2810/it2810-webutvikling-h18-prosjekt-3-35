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

    //Registers to the phone's pedometer
    componentDidMount = () => {
        this.subscribe();
        console.log("mounting pedometer");
    }
    
    //Unregister the phone's pedometer
    componentWillUnmount = () => {
        this.unsubscribe();
        console.log("unmounting pedometer");
    }
    
    subscribe = async () => {
        //Updates the current step count when walking.
        this.subscription = Pedometer.watchStepCount(result => {
            this.setState({currentStepCount: result.steps});
            this.props.updateSteps(this.state.pastStepCount + this.state.currentStepCount);
        });

        const end = new Date();
        const start = new Date();
        start.setHours(0,0,0,0);//Last midnight
        end.setHours(24,0,0,0);//This midnight

        //Gets the step count between two dates
        Pedometer.getStepCountAsync(start, end).then(
            result => {
                this.setState({ pastStepCount: result.steps});
                this.props.updateSteps(this.state.pastStepCount);
            },
            error => {
                console.log("Pedometer getStepCountAsync Error: " + error)
            }
        );
    };
    
    //Unsubscribes from the phones pedometer
    unsubscribe = () => {
        this.subscription && this.subscription.remove();
        this.subscription = null;
    };

    //Updates the parent's step count which is used in the graph
    updateSteps = (steps) => this.props.updateSteps(steps);

    render() {
        return (false);
      }
}