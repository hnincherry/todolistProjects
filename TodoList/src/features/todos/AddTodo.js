import React, {useState} from "react"
import { StyleSheet, Text, TextInput,View, TouchableOpacity } from "react-native";
import { addTodo } from "./todoSlice";
import { useDispatch } from "react-redux"

export const AddTodo = _ => {
    const [ text,setText ] = useState();
    const dispatch = useDispatch();

    const handleSubmit = _ => {
        dispatch(addTodo(text));
        setText('');
    }
    
    return(
        <View style={styles.container}>
            <TextInput placeholder="Todo" value={text} onChangeText={setText} style={styles.input}/>
            <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                <Text>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 2,
        flex: 1,
        
    },
    input: {
        backgroundColor: '#d1d1cf',
        marginBottom: 8,
        padding: 10,
        height: 50,
        width: 200,
        
    },
    btn: {
        padding: 20,
        backgroundColor: 'red'
    }
})