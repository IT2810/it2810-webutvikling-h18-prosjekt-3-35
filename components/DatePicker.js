import React, {
    Component
} from 'react';
import {
    Platform,
    AsyncStorage,
    StyleSheet,
    View,
    Text,
    Button,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export class DatePicker extends Component {
    constructor(props) {
        super(props);
        let today = new Date();

        this.state = {
            isDateTimePickerVisible: false,
            date: today,
            dateList: null,
            text: "No date selected",
        }
    }

    componentDidMount = () => this.retrieveData();

    componentDidUpdate = () => this.storeData();

    storeData = async () => {
        try {
            //await AsyncStorage.clear();
            await AsyncStorage.setItem('dateList', JSON.stringify(this.state.dateList))
        } catch (error) {

        }
    }

    retrieveData = async () => {
        try {
            //await AsyncStorage.clear();
            const value = await AsyncStorage.getItem('dateList');
            this.updateList(JSON.parse(value));
        } catch (error) {}
    }

    updateList = (dateList) => {
        this.setState({
            dateList: dateList,
        });
    }

    updateChosenDate = (date) => {
        date  = new Date(date);
        this.setState({
            date: date,
            text: "" + date,
        });
    }

    showDateTimePicker = () => this.setState({
        isDateTimePickerVisible: true
    });

    hideDateTimePicker = () => this.setState({
        isDateTimePickerVisible: false
    });

    handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        const dateList = this.state.dateList === null ? [] : this.state.dateList;
        console.log(dateList, date);
        dateList.push(date);
        this.setState({
            date: date,
            dateList: dateList,
        });
        this.updateList(dateList);
        this.hideDateTimePicker();
    };

    getDateList = () =>  {
        const data = this.state.dateList;
        const flatListData = [];
        for (date in data) {
            flatListData.push({
                key: date,
                value: "" + data[date],
            });
        }
        return (
            <FlatList
                data={flatListData}
                renderItem={({item}) =>
                    <TouchableWithoutFeedback onPress={ () => this.updateChosenDate(item.value)}>
                        <View>
                            <Text style={styles.item}>{item.value}</Text>
                        </View>
                    </TouchableWithoutFeedback>
            }/>
        )
    }

    render() {
        const flatList = this.getDateList();
        return ( <
            View style = {styles.container}>
                {flatList}

                <Text style = {styles.text}>
                    {this.state.text}
                </Text>

                <Button
                    title = {"Open Calendar"}
                    onPress = {() => this.showDateTimePicker()}
                    />

                <DateTimePicker
                    date = {this.state.date}
                    isVisible = {this.state.isDateTimePickerVisible}
                    onConfirm = {this.handleDatePicked}
                    onCancel = {this.hideDateTimePicker}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    text: {
        margin: 5,
        padding: 20,
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: 'steelblue',
        borderColor: 'black',
        borderRadius: 2,
        borderColor: 'black',
        borderWidth: 1,
    },
    listView: {

    },
    item: {
        textAlign: 'center',
        marginTop: 4,
        padding: 10,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white'
    }
});
