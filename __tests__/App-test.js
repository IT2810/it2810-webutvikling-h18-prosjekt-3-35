import 'react-native';
import React from 'react';
import App from '../App';
import PedometerProgressGraph from '../screens/HomeScreen';
import {stepsWalked} from '../screens/HomeScreen';
import {goal} from '../screens/HomeScreen';
import {goalResutText} from '../components/PedometerGraph';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('App snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the loading screen', async () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
    describe('<HomeScreen>', () => {
        it('Test mål, skritt gått, og om pedo er aktiv eller ei', () => {

            const inst = renderer.create(
                <PedometerProgressGraph returnText={stepsWalked}>

                </PedometerProgressGraph>
            );

            let instance = inst.root;

            console.log(instance._fiber.stateNode.state);

             expect(instance._fiber.stateNode.state.stepsWalked).toEqual(1000);
             expect(instance._fiber.stateNode.state.stepGoal).toEqual(10000);
             expect(instance._fiber.stateNode.state.pedometerModalVisible).toEqual(false);

            expect(inst.props).toMatchSnapshot();

        });
    });

  it('renders the root without loading screen', async () => {
    const tree = renderer.create(<App skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
