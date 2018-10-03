import React from 'react';
import {
  Platform,
  ScrollView,
  Image,
  StyleSheet,
  View
  } from 'react-native';
import { DatePicker } from '../components/DatePicker';


const logoSource = '../assets/images/pmm.png';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
          <View style={styles.container}>
              <Image
                source={require(logoSource)}
                style={styles.logo} />
              <View style={styles.lineStyle} />
              <ScrollView style={styles.ScrollView}>
                  <DatePicker style={styles.datepicer}/>
              </ScrollView>
          </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 20,
    },
    logo: {
        marginTop: 18,
        marginBottom: 5,
        height: 100,
        width: 100
    },
    ScrollView: {
        backgroundColor: 'lightgray',
        alignSelf: 'stretch',
    },
    lineStyle: {
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    }
});
