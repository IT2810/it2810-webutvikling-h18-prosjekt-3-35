# it2810-webutvikling-h18-prosjekt-3-35

### Private Muscle Manager (PMM)
PMM is an iOS and Android application that motivates the user to create exercises and add information about a session to the exercise. This data wil be used to plot the progress towards a goal and all of the sessions. The application will also include a pedometer and a goal. This will motivate the user to achieve and overall health goal and not just muscle.

### Functionality

### Design
We are basing a lot of the design on Google's material design and using the third party library Paper which allows for easy implementation of the material design guidelines.

### Testing (Jest)

Testing:

As there hasn’t been a new Update from enzyme, it is currently not compatible with React Native, and hence we ended up using the standard React Test Renderer combined with Jest, since it comes with the library itself, which means it’s always up-to-date and compatible. 

This turned out a bit problematic as the documentation for the React Test Renderer is extremely light. 

We utilized the create function to create a component tree such that we can set up the different tests. We also chose to use the .toJSON() function instead of the .toTree, as we only saw it necessary to return a JavaScript object representing the HTML output of our React Native components, and not the components structure itself in addition. 

The great thing about enzyme is the one can use CSS selectors to find what one needs, but the built in ReactTestRenderer supposedly has the .find() & .findAll(), findByProps() & .findAllByProps(), as well as findByType & findAllByType(). However, we decided that the way we would find components that we wanted tested would be through using expected(), created an instance from the root, and manually searched through he entire tree to find the component we wanted to test, making sure we got what we were after, as it proved to be a bit tricky to access states and props with jest. Example: 

 const inst = renderer.create(
     <PedometerProgressGraph returnText={stepsWalked}>

     </PedometerProgressGraph>
 );

We chose to add on the returnText and assign it to stepsWalked, such that it would be easier to search through root to find the data that we wanted to locate. Its origin:

import {stepsWalked} from '../screens/HomeScreen';

Then the transversing:

 let instance = inst.root;

 expect(instance._fiber.stateNode.state.stepsWalked).toEqual(1000);
 expect(instance._fiber.stateNode.state.stepGoal).toEqual(10000);
 expect(instance._fiber.stateNode.state.pedometerModalVisible).toEqual(false);
 expect(instance._fiber.stateNode.state.exercises).toEqual([]);


The team also used .toMatchSnapshot() for various pages of the application, to ensure everything was rendered as intended, and unexpected changes would be discovered.

  it('renders the HomeScreen', async () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

When testing navigation logic we created a renderer with the react component and important the functions from their respectable files, such that we could see that the structure was as intended. We created a title set tot he function, then compared to see if it came from the class which was supposed to (This was done on the more central functions, and not on every individual function in the project).

import alertDateMessage from '../screens/GraphingScreen’;


   describe('<HomeScreen>', () => {
       it('se at func hentes fra riktige klasser slik at nav oprerer slik den skal', () => {
           const component = renderer.create(
               <alertDateMessage message={() => {
               }} title={alertDateMessage}/>
           );

expect(component.root._fiber.stateNode.props.title).toEqual(GraphingScreen);


### Git

#### Projects
We are using Github's Projects functinality where we have seperated the project into 5 parts, 'To Do', 'Implementing Functionality', 'Implementing Style', 'Implementing Tests', and 'Done'. Where one card from to do will be dragged between them if appropriate. This means that the card 'Implement Jest (Testing)' won't be put in 'Implementing Style' since it is not deemed necessary.

#### Issues
All the cards from Projects have been used to create issues, the issues will be added in commits. If someone has forgotten to reference the issue in an commit they will comment on the issue/commit and tag the appropriate issue/commit it references.

### External libraries
- https://github.com/mmazzarolo/react-native-modal-datetime-picker
- https://github.com/JesperLekland/react-native-svg-charts
    - (Depends on) https://github.com/react-native-community/react-native-svg
- https://github.com/callstack/react-native-paper
