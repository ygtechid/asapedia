import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = ({title, desc}) => {
  return (
    <View style={{width: '100%', height: 71, backgroundColor: 'white', paddingHorizontal: 18, justifyContent: 'center'}}>
    <Text style={{fontSize: 14, color: '#00162A', fontWeight: 'bold'}}>{title} </Text>
    <Text style={{fontSize: 12, color: 'black', marginTop: 4}}>{desc} </Text>

    </View>
  )
}

export default Header

const styles = StyleSheet.create({})