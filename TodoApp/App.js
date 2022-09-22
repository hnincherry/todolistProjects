import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, ScrollView, RefreshControl, Modal, Pressable } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNetInfo } from '@react-native-community/netinfo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeProvider } from 'styled-components'

import * as theme from './src/theme'
import { StyledButton } from './src/theme'
import CustomTextInputCom from './components/CustomTextInputCom'
import Task from './components/Task'

const App = () => {

  const [data, setData] = React.useState([]);
  const [text, setText] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const netInfo = useNetInfo();
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editText, setEditText] = useState('')
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(-1)

  // update UI 
  const getResponse = async () => {
    const response = await AsyncStorage.getItem('todo');
    const result = JSON.parse(response)

    setData(result ? result : []);
  };

  useEffect(() => {
    getResponse();
  }, []);


  //Check Internet Connection
  useEffect(() => {

    console.log("Connection type", netInfo?.type);
    console.log("Is connected?", netInfo?.isConnected);
    console.log("Connection Detail", netInfo?.details);

  }, [])


  const refresh = useCallback(() => {
    setRefreshing(true)
    getResponse();
    setRefreshing(false)

  }, [refreshing])

  // Add new item in list && store in local && update UI
  const handleChange = _ => {

    if (text.length > 0) {
      Keyboard.dismiss();
      const toDoData = { "title": text, "complete": false };

      const toDOList = [...data, toDoData]; // add new data to ToDoList

      AsyncStorage.setItem('todo', JSON.stringify(toDOList));
      console.log('toDOList ', toDOList)

      getResponse();
      setText('')
      setAddModalVisible(false)
    } else {
      alert("Enter Task")
    }

  }

  // delete item that's realated to its index && store in local again
  const deleteTask = index => {
    index > -1 &&
      data.splice(index, 1)
    AsyncStorage.setItem('todo', JSON.stringify(data))
    console.log('Data ', data)
    getResponse()
  }

  // the check index is set to complete
  const completeTask = index => {
    let itemsCopy = [...data];

    itemsCopy[index].complete = !itemsCopy[index].complete

    setData(itemsCopy)

  }

  // 3. View list item to edit textbox
  const handleEdit = (item, index) => {
    setCurrentSelectedIndex(index)
    setEditModalVisible(true)
    setEditText(item.title)
  }

  // 4. Change EditText to array data
  const handleEditChange = () => {
    if (currentSelectedIndex > -1) {
      data[currentSelectedIndex].title = editText
      AsyncStorage.setItem('todo', JSON.stringify(data))
    }
    getResponse()
    setEditModalVisible(false)
  }

  let Final_theme = { ...theme }
  return (
    <ThemeProvider theme={Final_theme}>
      <View style={styles.container}>

        <View>
          <RefreshControl onRefresh={refresh}>
            <Text style={styles.sectionTitle}>Today's tasks</Text>
          </RefreshControl>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.taskWrapper}>
            <View style={styles.items}>

              {
                data.length > 0 &&
                data.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={_ => completeTask(index)}>
                      <Task
                        toDoData={item}
                        size='lg'
                        editText={item.title}
                        index={index}
                        handleCheck={_ => completeTask(index)}
                        onDelete={_ => deleteTask(index)}
                        handleEdit={_ => handleEdit(item, index)}
                      />
                    </TouchableOpacity>
                  )
                })
              }

            </View>
          </ScrollView>

        </View>

        <KeyboardAvoidingView style={styles.writeTaskWrapper} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

          <View style={styles.centeredView}>

            {/* Add Modal */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={addModalVisible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.modalText}>New Task</Text>
                    <TouchableOpacity onPress={_ => setAddModalVisible(false)}>
                      <MaterialIcons
                        name='close'
                        size={25}
                        color='#000000'
                      />
                    </TouchableOpacity>

                  </View>

                  <CustomTextInputCom
                    fontSize={15}
                    bgColor='light'
                    fontWeight='bold'
                    btnColor='light'
                    onTextChange={text => setText(text)}
                    value={text}
                  />

                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => handleChange()}
                  >
                    <Text style={styles.textStyle}>OK</Text>
                  </Pressable>


                </View>
              </View>
            </Modal>

            {/* Edit Modal */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={editModalVisible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.modalText}>Edit</Text>
                    <TouchableOpacity onPress={_ => setEditModalVisible(false)}>
                      <MaterialIcons
                        name='close'
                        size={25}
                        color='#000000'
                      />
                    </TouchableOpacity>
                  </View>

                  <CustomTextInputCom
                    fontSize={15}
                    bgColor='light'
                    fontWeight='bold'
                    btnColor='light'
                    onTextChange={text => setEditText(text)}
                    value={editText}
                  />

                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => handleEditChange()}
                  >
                    <Text style={styles.textStyle}>OK</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
          <TouchableOpacity onPress={() => setAddModalVisible(true)}>
            <StyledButton btnColor='#ffffff'>
              <MaterialIcons
                name='add'
                size={25}
                color='#0000ff'
              />
            </StyledButton>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        
      </View>
    </ThemeProvider>
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
    fontWeight: 'bold',
    color: '#000000',
    paddingTop: 20,
    paddingLeft: 16,
  },
  taskWrapper: {
    paddingHorizontal: 16
  },
  items: {
    marginTop: 10
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    padding: 10,
    alignItems: 'flex-end',

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(30, 30, 30, 0.2)'
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 80,
    elevation: 1,
    marginLeft: 165,
  },
  buttonClose: {
    backgroundColor: "#0000ff",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000000',
    paddingRight: 130,
  }

})

