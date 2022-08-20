import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { StyledTextInput } from '../src/theme'
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import AsyncStorage from '@react-native-async-storage/async-storage'

const TextInputCom = (...props) => {
    const [task, setTask] = React.useState();

    const handleChange = _ => {

        if (task.length > 0) {
            Keyboard.dismiss();
            const toDoData = { "title": task, "complete": false };
            // console.log('Data ', toDoData)

            // taskItems.push(toDoData);

            const toDOList = [...data, toDoData];

            AsyncStorage.setItem('todo', JSON.stringify(toDOList));
            console.log('toDOList ', toDOList)

            setData(toDOList);

            setTask('')
        } else {
            alert("Enter Task")
        }

    }

    const clearData = _ => {
        AsyncStorage.clear() &&
            setData([])
    }



    return (
        <View style={styles.container}>
            <StyledTextInput placeholder='Write a Task' multiline onChangeText={text => setTask(text)}></StyledTextInput>
            <TouchableOpacity onPress={handleChange}>
                <View style={styles.addWrapper}>
                    <Text style={styles.addText}>+</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearData}>
                <View style={styles.addWrapper}>
                    <Text style={styles.addText}>-</Text>
                </View>
            </TouchableOpacity>
        </View>

    )
}

export default TextInputCom

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    addWrapper: {
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
})