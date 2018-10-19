import 'react-native';
import React from 'react';
import App from '../App';
import * as ont from '../screens/GraphingScreen';
import openExerciseScreen from '../screens/HomeScreen';
import PedometerProgressGraph from '../screens/HomeScreen';
import {navigation} from '../screens/GraphingScreen';
import getTimeText from '../screens/GraphingScreen';
import isButtonDisabled from '../screens/CreateExerciseScreen';
import alertDateMessage from '../screens/GraphingScreen';
import GraphingScreen from '../screens/GraphingScreen';
import CreateExerciseScreen from '../screens/CreateExerciseScreen';
import HomeScreen from '../screens/HomeScreen';
import {acceptButtonText} from '../screens/StepGoalScreen';
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

   it('renders the HomeScreen', async () => {
     const tree = renderer.create(<HomeScreen />).toJSON();
     expect(tree).toMatchSnapshot();
   });

    it('renders the Pedometer', async () => {
      const tree = renderer.create(<PedometerProgressGraph />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders the root without loading screen', async () => {
      const tree = renderer.create(<App skipLoadingScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });

  
    describe('<HomeScreen>', () => {
        it('Test mål, skritt gått, og om pedo er aktiv eller ei, samt at øvelses array er tomt før bruker har laget egene', () => {

            const inst = renderer.create(
                <PedometerProgressGraph returnText={stepsWalked}>

                </PedometerProgressGraph>
            );

            let instance = inst.root;

             expect(instance._fiber.stateNode.state.stepsWalked).toEqual(1000);
             expect(instance._fiber.stateNode.state.stepGoal).toEqual(10000);
             expect(instance._fiber.stateNode.state.pedometerModalVisible).toEqual(false);
             expect(instance._fiber.stateNode.state.exercises).toEqual([]);

            expect(inst).toMatchSnapshot();

        });
    });


     describe('<HomeScreen>', () => {
         it('se at func hentes fra riktige klasser slik at nav oprerer slik den skal', () => {
             const component = renderer.create(
                 <alertDateMessage message={() => {
                 }} title={alertDateMessage}/>
             );


             console.log(component.root);

             expect(component.root._fiber.stateNode.props.title).toEqual(GraphingScreen);


             const component2 = renderer.create(
                 <openExerciseScreen exercise={() => {
                 }} title={openExerciseScreen}/>
             );
             expect(component2.root._fiber.stateNode.props.title).toEqual(HomeScreen);


              const component3 = renderer.create(
                  <getTimeText date={() => {
                  }} title={getTimeText}/>
              );
              expect(component3.root._fiber.stateNode.props.title).toEqual(GraphingScreen);


              const component4 = renderer.create(
                  <isButtonDisabled argument={() => {
                  }} title={isButtonDisabled}/>
              );
              expect(component4.root._fiber.stateNode.props.title).toEqual(CreateExerciseScreen);


         });
     });


      jest.mock("../screens/GraphingScreen");

      ont.getTimeText = jest.fn();
      let date_jest = 'Mon' + ' ' + '01' + ' ' + 'Jan';

      test("calls getTimeText from GraphingScreen with date_jest as argument", () => {
        ont.getTimeText(date_jest);
        expect(ont.getTimeText).toHaveBeenCalledWith(date_jest);
      });





});
