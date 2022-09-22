import { View, Text, TextInput, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { StyledTextInput } from '../src/theme'


const CustomTextInputCom = ({...props}) => {
    return (
        <View style={{flexDirection:'row'}}>
            <StyledTextInput placeholder='Enter task' multiline onChangeText={props.onTextChange} {...props}></StyledTextInput>
            
        </View>
    )
}

export default CustomTextInputCom
