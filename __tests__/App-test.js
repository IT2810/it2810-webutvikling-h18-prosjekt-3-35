import 'react-native';
import React from 'react';
import App from '../App';
import PedometerProgressGraph from '../screens/HomeScreen';
import {ModalPedometerGoal} from '../components/ModalPedometerGoal';
import {backButtonText} from '../components/ModalPedometerGoal';
import {acceptButtonText} from '../components/ModalPedometerGoal';
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
  
    it('renders the root without loading screen', async () => {
      const tree = renderer.create(<App skipLoadingScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });

  
    describe('<HomeScreen>', () => {
        it('Test mål, skritt gått, og om pedo er aktiv eller ei', () => {

            const inst = renderer.create(
                <PedometerProgressGraph returnText={stepsWalked}>

                </PedometerProgressGraph>
            );

            let instance = inst.root;

            console.log(instance);

             expect(instance._fiber.stateNode.state.stepsWalked).toEqual(1000);
             expect(instance._fiber.stateNode.state.stepGoal).toEqual(10000);
             expect(instance._fiber.stateNode.state.pedometerModalVisible).toEqual(false);

            expect(inst.props).toMatchSnapshot();

        });
    });

test('rendrer knapp med gitt props avhengig av tittel', () => {
  const component = renderer.create(
    <ModalPedometerGoal onClick={() => {}} title={backButtonText} />
  );

  expect(component.toJSON()).toMatchSnapshot();


   const component2 = renderer.create(
      <ModalPedometerGoal onClick={() => {}} title={acceptButtonText} />
   );

   expect(component2.toJSON()).toMatchSnapshot();

});

});
