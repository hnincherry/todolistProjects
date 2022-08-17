import React from 'react'
import { Text, View, StyleSheet} from "react-native"
import { AddTodo } from "./AddTodo"

export const TodoApp = _ => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Todo App
            </Text>
            <AddTodo/>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 12,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    }
})