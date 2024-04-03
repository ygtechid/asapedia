/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MainLogo from '../../assets/asapedia.png';
import Fire from '../../config/Fire';

const Register = ({navigation}) => {
  const [inputan, setInput] = useState({
    nama: "",
    email: "",
    password: "",
    whatsapp: ""
  })
  const [loading, setLoading]= useState(false)

  console.log('inputan', inputan);

  const handleRegister = async () => {
    setLoading(true)
    if (inputan.email && inputan.password) {
        // setLoa
        // Fire.auth()
        //   .createUserWithEmailAndPassword(inputan.email, inputan.password)
        //   .then((success) => {
        //     const data = {
        //       nama: inputan.nama,
        //       email: inputan.email,
        //       uid: success.user.uid,
             
       
             
        //     };
        var codeOtpRandom = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
        
             const data = {
              nama: inputan.nama,
              username: inputan.email,
              password: inputan.password,
              uid: "ASA" + codeOtpRandom,
              whatsapp: inputan.whatsapp,
              priority: "no",
              saldo: 0
             }
              console.log('tddd', data);
             try {
              await Fire.database()
              .ref(`users/${inputan.email}/`)
              .set(data).then((res) => {
                setLoading(false)
                alert("Berhasil Daftar!")

                setTimeout(() => {
                  navigation.replace('Login');
                setLoading(false);
                }, 2000);
 
              })

  
          
          
             } catch(err) {
              setLoading(false)

                alert(err)
             }
     
         
           
          // })
          // .catch((error) => {
          //   const errorMessage = error.data;
          //   setLoading(false);
          //   console.log('err', errorMessage);
          //   alert(errorMessage)
    
          // });
      } else {
        alert('Form Tidak Boleh ada yang Kosong')
        console.log('else');
      }
    
  }
  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 110,
        }}>
        <>
         
        <Image source={MainLogo} style={{width: 100, height: 100}} />
        <Text style={{color: '#D8EDFD', fontWeight: 'bold', fontSize: 16, marginBottom: 30, marginTop: 10,}}>Daftar Akun</Text>
          <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 8,
              width: '70%',
              color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Nama"
            onChangeText={(e) => setInput({ ...inputan, nama: e })}  
          />

<TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 8,
              width: '70%',
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
              width: '70%',
              color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Password"
            onChangeText={(e) => setInput({ ...inputan, password: e })}  
            secureTextEntry
          />
          <TextInput
           
           style={{
            backgroundColor: '#F0F7FF',
             borderRadius: 12,
             marginBottom: 8,
             width: '70%',
             color: 'black'
           }}
           placeholderTextColor="grey" 
           placeholder="Nomor WhatsApp"
           onChangeText={(e) => setInput({ ...inputan, whatsapp: e })}  
         />
       
       {loading ? 
       <ActivityIndicator size="large" color="black" />
       :
<TouchableOpacity style={{backgroundColor: '#78C5FF', width: '70%', height: 40,  marginBottom: 14, borderRadius: 8, marginTop: 30}} 
             onPress={handleRegister}
              >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Daftar</Text>
    </TouchableOpacity>
      }
         
   

   
     

        </>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
