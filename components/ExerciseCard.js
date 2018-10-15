import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';


export class ExerciseCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={style.container}>
                <Text>{this.props.title}</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignContent: 'stretch',
    },
});