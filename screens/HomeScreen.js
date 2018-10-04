import React from 'react';
import {
    Platform,
    AsyncStorage,
    ScrollView,
    Image,
    StyleSheet,
    View
} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {DatePicker} from '../components/DatePicker';


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
                    style={styles.logo}/>
                <View style={styles.lineStyle}/>
                <ScrollView style={styles.ScrollView}>
                    <Card>
                        <Card.Content>
                            <Title>Markløft</Title>
                        </Card.Content>
                    </Card>
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
        width: 105
    },
    ScrollView: {
        backgroundColor: 'lightgray',
        alignSelf: 'stretch',
    },
    lineStyle: {
        alignSelf: 'stretch',
        borderWidth: 3,
        borderColor: 'black',
        borderBottomColor: 'lightgray',
        backgroundColor: 'lightgray',
    }
});
