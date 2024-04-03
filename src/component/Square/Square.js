
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Square = ({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}  style={{backgroundColor: 'white', borderRadius: 5 ,width: '100%', height: 50, marginTop: 16, justifyContent: 'center', padding: 10, alignSelf: 'center'}}>
    <Text style={{fontSize: 12, color:  '#00162A'}}>{text}</Text>
</TouchableOpacity>
  )
}

export default Square

const styles = StyleSheet.create({})