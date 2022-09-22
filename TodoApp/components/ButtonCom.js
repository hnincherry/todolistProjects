import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyledButton } from '../src/theme/common/button'

export const ButtonCom = ({children, ...props})=>{
    return(
        <StyledButton {...props}>
            {children}
        </StyledButton>
        
    )
}