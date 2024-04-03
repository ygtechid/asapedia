import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'


const TextWithBorder = ({title, src, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{flexDirection:'row', marginTop: 10}}>
        <Image source={src} />
      <Text style={{ color: '#292929', marginLeft: 10}}>{title}</Text>
      </View>
       
                 <View style={{borderWidth: 0.3, borderColor: '#B3C9DD', marginTop: 16}}></View>
    </TouchableOpacity>
  )
}

export default TextWithBorder

const styles = StyleSheet.create({})