import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export class ExerciseCard extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignContent: 'stretch',
        marginBottom: 5,
        padding: 10,
    },
    title: {
        fontSize: 18,
    }
});