import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { createStackNavigator } from 'react-navigation';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import StepGoalScreen from './screens/StepGoalScreen';
import CreateExerciseScreen from './screens/CreateExerciseScreen';
import GraphingScreen from './screens/GraphingScreen';
import CreateSessionScreen from './screens/CreateSessionScreen';

const theme = {
    ...DefaultTheme,
    dark: true,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#5c92aa',
        accent: '#5c92aa',
        background: '#ecf8ff',
        surface: '#30375e',
        text: '#041234',
        disabled: '#8dc2dc',
        placeholder: '#5c618b',
        backdrop: '#ffffff',
    },
    fonts: {
        ...DefaultTheme.fonts,

    }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />);
    } else {
      return(
          <PaperProvider theme={theme}>
              <RootStack />
          </PaperProvider>
      );
    }
  }
}

const RootStack = createStackNavigator({
    Home: HomeScreen,
    StepGoal: StepGoalScreen,
    CreateExercise: CreateExerciseScreen,
    ExerciseGraph: GraphingScreen,
    CreateSession: CreateSessionScreen,
  },
  {
    initialRouteName: 'Home',
});
