import React, { Component } from 'react';
import {
    Platform,
    AsyncStorage,
    StyleSheet,
    View,
    Text,
    Button,
    DatePickerIOS,
    DatePickerAndroid
} from 'react-native';

export class DatePicker extends Component {
    constructor(props) {
        super(props);
        let today = new Date();

        this.state = {
            year: today.getFullYear(),
            month: today.getMonth(),
            date: today.getDate(),
            text: "No date set",
        };
    }

    componentDidMount() {
        this.retrieveData();
    }

    componentDidUpdate() {
        this.storeData();
    }

    async storeData() {
        try {
            await AsyncStorage.setItem('date', JSON.stringify([this.state.year, this.state.month, this.state.date]))
        } catch (error) {

        }
    }

    async retrieveData() {
        try {
            const value = await AsyncStorage.getItem('date');
            this.updateText(JSON.parse(value));
        } catch (error) {

        }
    }

    iosDatePicker(year, month, date) {
        return <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
        />
    }

    async androidDatePicker(year, month, date) {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date(parseInt(this.state.year), parseInt(this.state.month), parseInt(this.state.date))
            });
            if (action === DatePickerAndroid.dateSetAction) {
                this.updateText([year, month, day]);
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    updateText(date) {
        this.setState({
            year:date[0],
            month:date[1],
            date:date[2],
            text: date[0]+"."+date[1]+"."+date[2]
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.text}
                    >
                {this.state.text}
                </Text>
                <Button
                    title={"Open Calendar"}
                    onPress={() => Platform.OS == 'ios' ? this.iosDatePicker() : this.androidDatePicker()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 1
    },
    text : {
        margin: 5,
        padding: 20,
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: 'steelblue',
        borderColor: 'black',
        borderRadius: 2,
        borderColor: 'black',
        borderWidth: 1,
    }
});
