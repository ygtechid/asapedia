import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Logo from '../../assets/asapedia.png'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashScreen = ({navigation})  => {

    const gettoken = async () => {
        const getStorage =  await AsyncStorage.getItem('@token')
         console.log('getstorsplash', getStorage);
         setTimeout(() => {
            if(getStorage) {
                navigation.navigate('MyTabs')
            } else {
                navigation.navigate('Login')
            }
    
           
        }, 2000);
     }
     
     useEffect(() => {
         gettoken()
     }, [])

   

  return (
    <View style={{flex: 1, backgroundColor: '#FAFAFC', justifyContent: 'center'}}>
        <View style={{alignItems: 'center'}}>
        <Image source={Logo} style={{width: 100, height: 100}} />
        <View style={{marginTop: 20, alignItems: 'center'}}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold', fontFamily: 'Poppins-Bold'}}>ASAPEDIA</Text>
        <Text style={{color: 'black', fontSize: 16}}>Solusi Pembayaran Anda</Text>
        </View>
       

        </View>
 
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})