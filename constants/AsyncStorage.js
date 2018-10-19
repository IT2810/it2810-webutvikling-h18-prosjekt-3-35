import {
    AsyncStorage,
} from 'react-native';

//Takes in a location for the data, as well as the data saved
export async function saveData (location, data) {
    try {
        await AsyncStorage.setItem(location, JSON.stringify(data));
    } catch (error) {
        console.warn(error);
    }
}