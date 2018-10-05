import 
    React, {
    Component,
} from 'react';
import {
    StyleSheet,
    Modal,
    View,
    Text,
    TextInput,
    Button,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';

const backButtonText = "Back";
const acceptButtonText = "OK"

export class ModalPedometerGoal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goal: this.props.goal,
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.goal !== this.props.goal) {
            this.setState({goal: this.props.goal});
        }
    }
    
    render() {
        if (this.props.visible) {
            return(
                <View>
                    <Modal
                        style={styles.modalContainer}
                        animationType="slide"
                        transparent={false}
                        visible={this.props.visible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                                <View style={styles.modalContainer}>
                                    <View style={styles.stateText}>
                                        <Text style={styles.text}>You have walked {this.props.steps} steps</Text>
                                        <Text style={styles.text}>Your daily goal is {this.state.goal} steps</Text>
                                    </View>
                                    <View style={styles.textInputRow}>
                                        <Text>Edit goal steps:</Text>  
                                            <TextInput
                                                style={styles.inputField}
                                                defaultValue={String(this.props.goal)}
                                                keyboardType={'numeric'}
                                                onChangeText={(number) => this.setState({goal: number})}/>                            
                                    </View>
                                    <View style={styles.buttonRow}>
                                        <Button
                                        title={backButtonText}
                                        onPress={() => this.props.hideModal()}
                                        />

                                        <Button 
                                        title={acceptButtonText}
                                        onPress={() => this.props.acceptChange(this.state.goal)}
                                        />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                    </Modal>
                </View>
            );
        }
        return false;
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flexDirection: 'column',
        flex: 1,
        margin: 20,
    },
    inputField: {
        padding: 5,
        textAlign: 'center',
    },
    textInputRow: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    stateText: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
    },
    text:  {
        textAlign: 'center',
        fontSize: 20,
    }
});