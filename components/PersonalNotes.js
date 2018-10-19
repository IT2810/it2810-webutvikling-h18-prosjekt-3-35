import React, { Component  } from "react";
import {
    View,
} from 'react-native';
import {
    Text,
} from 'react-native-paper';

export default class PersonalNotes extends Component {
    render() {
        return(
            <View>
                <Text><Text style={{fontWeight: 'bold'}}>Notes:</Text> {this.props.personalNotes}</Text>
            </View>
        );
    }
}