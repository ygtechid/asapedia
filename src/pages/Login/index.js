/* eslint-disable prettier/prettier */
import {ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';

import axios from "axios"
import { APIUrl } from '../../context/APIUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainLogo from '../../assets/logoCluster.png'
import Fire from '../../config/Fire';

const Login = ({navigation}) => {
  const [inputan, setInput] = useState({
    email: "",
    password: "",
    
  })
  const [loading, setLoading]= useState(false)

  console.log('inputan', inputan);

  const handleLogin = async () => {
    setLoading(true);
  
    const prefix = "TKN"
    const uniquenumber = Math.floor(Math.random() * 1000000);
   const token = prefix + uniquenumber
  console.log('token', token);
  AsyncStorage.setItem('@token', token)
    // Fire.auth()
    //   .signInWithEmailAndPassword(inputan.email, inputan.password)
    //   .then((res) => {
    //     setLoading(false);
       

       
    //       .catch((err) => {
    //         setLoading(false);
    //         console.log(err);
    //       });
    //   })
    Fire.database()
    .ref(`users/${inputan.email}/`)
    .once('value')
    .then((resDB) => {
     console.log('hasillogin', resDB.val());
     const respon = resDB.val()
     setLoading(false);
 
     if(inputan.email == respon.username && inputan.password == respon.password) {
    navigation.push('MyTabs', {
            findSelf:  respon,
          
          });

          AsyncStorage.setItem('@findSelf', 
            JSON.stringify(resDB.val()))

          AsyncStorage.setItem('@userid', inputan.email)
     } else if(inputan.email == "") {
      alert('Silahkan input username')

     } else if(inputan.password == "") {
      alert('Silahkan input password')

     } else {
      alert('Data yang anda masukan tidak terdaftar. ')


     }
      

    }
    
    )
      .catch((error) => {
        const errorMessage = error.message;
        console.log('eror', errorMessage);
        setLoading(false);
        alert('Data yang anda masukan tidak terdaftar. Silahkan melakukan pendaftaran terlebih dahulu')
        // setLoading(false);
        // showMessage({
        //   message: errorMessage,
        //   type: 'default',
        //   backgroundColor: colors.error,
        //   color: colors.white,
        // });
      });


  // if(inputan.email == "admin@gmail.com" && inputan.password == "admin") {
  //     navigation.navigate('Home')
  
  //     console.log('token', token);
  // } else {
  //     alert('Email dan Password Salah!')
  // }
  }

  const handleRegister = async () => {
    
       navigation.navigate('Register')
      
   }
  
  return (
    <View style={{flex: 1, backgroundColor: 'white', }}>
      <View
        style={{
          // alignItems: 'center',
 
          marginLeft: 30,
          marginTop: 80,
        }}>
        <>
         
      
      
        <Text style={{color: '#040404', fontWeight: 'bold', fontSize: 24,  marginTop: 10,}}>Login</Text>
        
        <Text style={{color: '#808080',  fontSize: 16, marginBottom: 30, marginTop: 10,}}>Silahkan masuk menggunakan akun anda</Text>
          <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 8,
              width: '90%',
              color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Username"
            onChangeText={(e) => setInput({ ...inputan, email: e })}  
          />
          <TextInput
           
            style={{
             backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 8,
              width: '90%',
              color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Password"
            onChangeText={(e) => setInput({ ...inputan, password: e })}  
            secureTextEntry
          />
       
       


       {loading ? 
       <ActivityIndicator size="large" color="black" />
       :
       <>

<TouchableOpacity style={{backgroundColor: '#78C5FF', width: '90%', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 30}} 
             onPress={handleLogin}
              >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Login</Text>
    </TouchableOpacity>


    <Text style={{color: '#808080',  width: '90%', fontSize: 16, marginBottom: 5, marginTop: 10, textAlign: 'center'}}>Belum memiliki akun?</Text>
    <Text style={{color: 'blue', fontWeight: 'bold',  width: '90%', fontSize: 14,  textAlign: 'center'}}
    onPress={handleRegister}
    >Daftar Disini</Text>

    {/* <TouchableOpacity style={{backgroundColor: '#78C5FF', width: '80%', height: 40,  marginBottom: 14, borderRadius: 8, marginTop: 10}} 
             onPress={handleRegister}
              >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Daftar</Text>
    </TouchableOpacity>  */}
       </>
      }
         
   

   
     

        </>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
