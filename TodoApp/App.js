import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, FlatList, ScrollView } from 'react-native'
import React from 'react'
import Task from './components/Task'
import { useState } from 'react'


const App = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleChange = _ => {
    console.log(task)

    if (task.length > 0) {
      Keyboard.dismiss();
      const toDoData = { "title": task, "complete": false };
      console.log('Data ', toDoData)

      // taskItems.push(toDoData);
      const toDOList =  [...taskItems, toDoData];
      console.log('toDOList ', toDOList)
      // setTaskItems(taskItems);
      setTaskItems(toDOList);


      // setTaskItems([...taskItems, toDoData]);

      setTask('')
    }else {
      alert("Enter Task")
    }

  }

  const completeTask = index => {
    let itemsCopy = [...taskItems];
    // itemsCopy.splice(index, 1);
    itemsCopy[index].complete = !itemsCopy[index].complete
    // alert(JSON.stringify(itemsCopy[index]))
    // alert(itemsCopy)

    setTaskItems(itemsCopy)


  }

  return (
    <View style={styles.container}>

      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.items}>

            {
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={_ => completeTask(index)}>
                    <Task toDoData={item}/>
                  </TouchableOpacity>
                )
              })
            }

          </View>
        </ScrollView>

      </View>

      <KeyboardAvoidingView style={styles.writeTaskWrapper} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TextInput style={styles.input} placeholder='Write a Task' value={task} onChangeText={text => setTask(text)}></TextInput>
        <TouchableOpacity onPress={handleChange}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebeaed'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  taskWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20
  },
  items: {
    marginTop: 30
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: 250,
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addText: {},

})