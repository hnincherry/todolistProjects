import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, FlatList, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Task from './components/Task'
// import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNetInfo } from '@react-native-community/netinfo'
import LinearGradient from 'react-native-linear-gradient'


const App = () => {
  const [task, setTask] = React.useState();

  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = useState(false)
  const netInfo = useNetInfo();

  const getResponse = async () => {
    const response = await AsyncStorage.getItem('todo');
    const result = JSON.parse(response)

    setData(result ? result : []);
  };

  // useEffect(() => { 
  //   getResponse();
  // },[]);


  //Check Internet Connection
  useEffect(() => {

    console.log("Connection type", netInfo?.type);
    console.log("Is connected?", netInfo?.isConnected);
    console.log("Connection Detail", netInfo?.details);

  }, [])


  const refresh = useCallback(() => {
    setRefreshing(true)
    // dispatch(AuthAction.getProfile())
    getResponse();
    setRefreshing(false)

  }, [refreshing])


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



  const completeTask = index => {
    let itemsCopy = [...data];
    // itemsCopy.splice(index, 1);
    itemsCopy[index].complete = !itemsCopy[index].complete
    // alert(JSON.stringify(itemsCopy[index]))
    // alert(itemsCopy)

    setData(itemsCopy)

  }

  // console.log(data.length,"uuu")

  return (
    <View style={styles.container}>

      <View style={styles.taskWrapper}>
        <RefreshControl onRefresh={refresh}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
        </RefreshControl>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.items}>

            {
              data.length > 0 &&
              data.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={_ => completeTask(index)}>
                    <Task toDoData={item} colorId={index % 2} />
                  </TouchableOpacity>
                )
              })
            }

          </View>
        </ScrollView>

      </View>

      <KeyboardAvoidingView style={styles.writeTaskWrapper} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TextInput style={styles.input} placeholder='Write a Task' value={task} multiline onChangeText={text => setTask(text)}></TextInput>
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


      </KeyboardAvoidingView>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <Text style={styles.buttonText}>
          Sign in with Facebook
        </Text>
      </LinearGradient>

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
    width: 230,
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    flexWrap: "wrap",
    overflow: "scroll"
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
  linearGradient: {
    // flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginLeft: 20,
    height: 50,
    width: 300,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },

})