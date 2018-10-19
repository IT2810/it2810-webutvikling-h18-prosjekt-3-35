import React, { Component  } from "react";
import {
    View,
    Text,
} from 'react-native';

export default class PersonalNotes extends Component {
    render() {
        return(
            <View>
                <Text>Notes:</Text>
                <Text>{this.props.personalNotes}</Text>
            </View>
        );
    }
}