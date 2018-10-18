import 'react-native';
import React from 'react';
import App from '../App';
import * as ont from '../screens/GraphingScreen';
import openExerciseScreen from '../screens/HomeScreen';
import PedometerProgressGraph from '../screens/HomeScreen';
import {navigation} from '../screens/GraphingScreen';
import getTimeText from '../screens/GraphingScreen';
import alertDateMessage from '../screens/GraphingScreen';
import GraphingScreen from '../screens/GraphingScreen';
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


         });
     });

      const testFunc = (a, b, callback) => {
        callback(a + b);
      };
      
      test("calls callback with arguments to them", () => {
        const mockCallback = jest.fn();
        testFunc(1, 2, mockCallback);
        expect(mockCallback).toHaveBeenCalledWith(3);
      });

   /*   const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


      const testTime = (date) => {
              date = new Date(date);
              const weekday = weekdays[date.getDay()];
              const month = months[date.getMonth()];
              return weekday + ' ' + date.getDate() + ' ' + month;
          }


        test("", () => {
          const getTimeText = jest.fn();
          testTime( 'Mon' + ' ' + '01' + ' ' + 'Jan');
          expect(getTimeText).toEqual();
        });

            */
                    
});
