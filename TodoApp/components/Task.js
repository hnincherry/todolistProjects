import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';

const Task = (props) => {
    const refRBSheet = useRef()
   
    return (
        <View style={[styles.items]}>

            <View style={styles.itemsLeft}>
                <TouchableOpacity onPress={props.handleCheck}>
                    <Feather
                        name={props.toDoData.complete ? 'check-circle' : 'circle'}
                        color='#0000ff'
                        size={25}
                    />
                </TouchableOpacity>

                <Text style={[styles.itemText, { textDecorationLine: props.toDoData.complete ? 'line-through' : 'none', textDecorationStyle: 'solid' }]}>{props.toDoData.title}</Text>

            </View>

            {/* 1. open bottom sheeet */}
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <Feather
                    name='more-vertical'
                    color='grey'
                    size={25}
                />
            </TouchableOpacity>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={false}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(30, 30, 30, 0.2)'
                    },
                    container: {
                        height: 150,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        elevation: 10
                    }
                }}
            >
                <View style={styles.bottomSheetContainer}>
                    <Text style={styles.sectionTitle}>Action</Text>
                    <TouchableOpacity onPress={_ => refRBSheet.current.close()}>
                        <MaterialIcons
                            name='close'
                            size={25}
                            color='#000000'
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ padding: 15 }}>
                    {/* 2. Open Edit Modal From handleEdit*/}
                    <TouchableOpacity onPress={() => {
                        refRBSheet.current.close()
                        props.handleEdit()
                    }}>
                        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                            <Feather
                                name='edit'
                                size={30}
                                color='#000'
                            />
                            <Text style={styles.itemText}>Edit</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        refRBSheet.current.close()
                        props.onDelete()
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Feather
                                name='trash-2'
                                size={30}
                                color='#000'
                            />
                            <Text style={styles.itemText}>Delete</Text>
                        </View>
                    </TouchableOpacity>

                </View>


            </RBSheet>

        </View>
    )
}

export default Task

const styles = StyleSheet.create({
    items: {
        marginBottom: 10,
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingRight: 5,
        paddingBottom: 15,
        paddingLeft: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    itemsLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        maxWidth: '80%',
        fontSize: 16,
        paddingLeft: 8,
        color: '#000000',
        textAlign: 'center'
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        paddingLeft: 16,
    },
    bottomSheetContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingRight: 10 }
})