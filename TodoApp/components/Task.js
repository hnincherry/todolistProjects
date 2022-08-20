import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const Task = (props) => {
  return (
    <View style={[styles.items,{borderColor: props.colorId === 0 ? 'red' : 'green'}]}>
        <View style={styles.itemsLeft}>
            <TouchableOpacity style={styles.square}>
                
            </TouchableOpacity>
            {/* <Text style={[styles.itemText,{textDecorationLine: props.text.complete ? 'line-through' : 'none', textDecorationStyle: 'solid'}]}>{props.text.title}</Text> */}
            {/* <Text style={styles.itemText}>{props.text}</Text> */}
            <Text style={[styles.itemText,{textDecorationLine: props.toDoData.complete ? 'line-through' : 'none', textDecorationStyle: 'solid'}]}>{props.toDoData.title}</Text>
        </View>
        <View style={styles.circular}></View>
    </View>
  )
}

export default Task

const styles = StyleSheet.create({
    items: {
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    itemsLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    square: {
        backgroundColor: '#558cf6',
        width: 24,
        height: 24,
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15
    },
    itemText: {
        maxWidth: '80%',
        
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#558cf6',
        borderRadius: 5,
        borderWidth: 2
    },
})