import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native'
import IMGAx from '../../assets/fakefoto.png'
import AsyncStorage from '@react-native-async-storage/async-storage'



const Appointment = ({navigation}) => {
  const [findSelf, setFindself] = useState({})

  const gettoken = async () => {
    const getToken =  await AsyncStorage.getItem('@token')
    const getFindself =  await AsyncStorage.getItem('@findSelf')
    const getUID =  await AsyncStorage.getItem('@userid')
     const parseFindself = JSON.parse(getFindself)
     setFindself(parseFindself)
     console.log('getstor', getFindself);
 }
 
 const handleLogout = async () => {
  await AsyncStorage.clear()
  navigation.replace('Splash')
}


 useEffect(() => {
  gettoken()
}, [])
 


  return (
    <View style={{flex: 1, backgroundColor: '#72AFF4'}}>
    
    <View style={{backgroundColor: 'white', marginTop: 20, height: 800, width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20}}>
      <TouchableOpacity style={{backgroundColor: '#78C5FF', alignSelf: 'center', width: '70%', height: 40,  marginBottom: 14, borderRadius: 8, marginTop: 30}} 
 onPress={handleLogout}
  >
<Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Logout</Text>
</TouchableOpacity>
      </View>
    </View>
  )
}

export default Appointment

const styles = StyleSheet.create({})