
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SquareProfile = ({text, title}) => {
  return (
    <View style={{marginTop: 10}}>
        <Text style={{marginLeft: 16, marginBottom: 5, fontSize: 12, color: '#6A6A6A'}}>{title}</Text>
<View style={{backgroundColor: '#E6EDF4', borderRadius: 5 ,width: '90%', height: 36, justifyContent: 'center', padding: 10, alignSelf: 'center'}}>
    <Text style={{fontSize: 12, color:  '#00162A'}}>{text}</Text>
</View>
    </View>
    
  )
}

export default SquareProfile

const styles = StyleSheet.create({})