import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { Image, PermissionsAndroid, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import HeaderSecondary from '../../component/Header/HeaderSecondary';
import Fire from '../../config/Fire';
import { conversiDateTimeIDN } from '../../context/DateTimeServices';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';


const AddDataLeads = ({navigation, route}) => {

   const {uid} = route.params;
   const [image, setImage] = useState([]);
   const [loading, setLoading] = useState(false);
  const [langitude, setLangitude] = useState("")
  const [latitude, setLatitude] = useState("")

   const [imageKTP, setImageKTP] = useState([]);
  const [location, setLocation] = useState(location)
    const [dateConfirmAngka, setDateConfirmAngka] = useState("")
    const [uploading, setUploading] = useState(false)
    const [transferred, setTransferred] = useState(0)

    const datez = new Date()
    const datenos = conversiDateTimeIDN(datez)
    console.log('vallstat', datenos);
    
    const [status, setStatus] = useState([
        {label: 'Prospek', value: 'Prospek',   },
        {label: 'Kualifikasi', value: 'Kualifikasi', },
        {label: 'Visit', value: 'Visit', },
        {label: 'Kebutuhan Terpenuhi', value: 'Kebutuhan Terpenuhi', },
        {label: 'Bandingkan Produk', value: 'Bandingkan Produk', },
        {label: 'BI Check', value: 'BI Check', },
        {label: 'Pengajuan', value: 'Pengajuan', },
        {label: 'Booking Fee', value: 'Booking Fee', },
       

        
      ]);
      const [source, setSource] = useState([
        {label: 'Exhibition', value: 'Exhibition',   },
        {label: 'Database', value: 'Database', },
        {label: 'FB/IG', value: 'FB/IG', },
        {label: 'Reference', value: 'Reference', },
        {label: 'Tim Digital', value: 'Tim Digital', },
        {label: 'Walk-In', value: 'Walk-In', },

       

        
      ]);

    const [inputan, setInput] = useState({
        name: "",
        alamat: "",
        whatsapputama: "",
        whatsapptambahan: "",
        hari: "",
        harga: "",
        jmlgalon: "",
        jenisoutlet: "Retail",
        marketing: uid.nama,
        tanggalinput: datenos,
        cabang: uid.cabang,
        team: uid.team,
        longitude: langitude,
        latitude: latitude,
        status: "Pesanan Dibuat"


        
      })
      const [date, setDate] = useState(new Date())
      const [dateConfirm, setDateConfirm] = useState("")

      const [open, setOpen] = useState(false)
      console.log('tanggal', dateConfirm);

    const gettoken = async () => {
       const getToken =  await AsyncStorage.getItem('@token')
       const getFindself =  await AsyncStorage.getItem('@findSelf')
       const getUID =  await AsyncStorage.getItem('@userid')
        const parseFindself = JSON.parse(getFindself)
        setFindself(parseFindself)
        console.log('getstor', getUID);
    }
    
    const selectImage = async () => {
      const options = {
        maxWidth: 2000,
        maxHeight: 2000,
        includeBase64: true,
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };
      await launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          Geolocation.getCurrentPosition(info => {
            console.log('lokasi', info)
            setLangitude(info.coords.langitude)
            setLatitude(info.coords.latitude)
          }
            
           
            );

          const source = response.assets[0]
          setImage(source);
          const paths = response.assets[0].originalPath
          const { uri } = source;
          setUploading(true);
          setTransferred(0);
          
         
// const storageRef = ref(storage,'img.png');
// const message2 = source;
// uploadString(storageRef, message2, 'base64').then((snapshot) => {
//   console.log('Uploaded a base64 string!');
// });
        
        }
      });
    };
    
    const handleConfirm = (currentDate) => {
        const tgl = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
        const bln = currentDate.getMonth() + 1 < 10 ? "0" + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
        var jdw = currentDate.getFullYear() + "/" + bln + "/" + tgl;
        console.log(jdw);
      setDateConfirmAngka(tgl)
        setDateConfirm(jdw);
       
      };
  
      const selectImageKTP = async () => {
        const options = {
          maxWidth: 2000,
          maxHeight: 2000,
          includeBase64: true,
          storageOptions: {
            skipBackup: true,
            path: 'images'
          }
        };
        await launchImageLibrary(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = response.assets[0]
            console.log('RESS', source);
            setImageKTP(source);
            const paths = response.assets[0].originalPath
            const { uri } = source;
            // // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
            // setUploading(true);
            // setTransferred(0);
            
           
  // const storageRef = ref(storage,'img.png');
  // const message2 = source;
  // uploadString(storageRef, message2, 'base64').then((snapshot) => {
  //   console.log('Uploaded a base64 string!');
  // });
          
          }
        });
      };


      
const handleAdd = async () => {

    setLoading(true)
    const idOrder = uuid.v4()
    console.log('idOrder', idOrder);

    inputan.id = idOrder
   try {
    Fire.database()
    .ref('order/' + idOrder + '/')
    .set(inputan)
    .then((resDB) => {
      axios.post('https://api.fonnte.com/send', {
        target: inputan.whatsapputama,
        message: "*[PESAN DARI APLIKASI AXIRO AIR MINUM ISI ULANG]* \n \n Terima Kasih atas pesanan anda. Pesanan anda akan segera kami proses.  \n \n  Jika ada pertanyaan mengenai AXIRO bisa menghubungi nomor 0220913813 \n \n Terima Kasih, \n AXIRO MANAGEMENT"
      }, {
        headers: {
          Authorization: 'F1b9L7Rn9dq@@9okuqmK'
        }
      }).then((res) => {
        setLoading(false)
        console.log('RES', res);
        navigation.replace('MyTabs')
        alert('Berhasil Tambah Data')
      })
     
    })
   } catch (e) {
      setLoading(false)
      alert(e)
   }
    
    console.log('datapara', data);
   
}

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Izinkan Akses Lokasi',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
     alert('Anda harus mengaktifkan akses Lokasi')
    }
  } catch (err) {
    console.warn(err);
  }
};

useEffect(() => {
    gettoken()

}, [])


  return (
    <>
    
    <View style={{flex: 1, backgroundColor : 'white' }}>
     <HeaderSecondary title={"Tambah Pelanggan"}  />
 
     <ScrollView>
       
       <View style={{padding: 16}}>
     
       <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 8,
              width: '80%',
              alignSelf: 'center',
              color: 'black'

            }}
            placeholderTextColor="grey" 
            placeholder="Nama Lengkap"
            onChangeText={(e) => setInput({ ...inputan, name: e })}  
          />
           <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 8,
              width: '80%',
              alignSelf: 'center',
              color: 'black'

            }}
            placeholderTextColor="grey" 
            placeholder="Alamat Lengkap"
            onChangeText={(e) => setInput({ ...inputan, alamat: e })}  
          />
             <TextInput
             keyboardType='numeric'
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
              width: '80%',
              alignSelf: 'center',
              color: 'black'

            }}
            placeholderTextColor="grey" 
            placeholder="No. WhatsApp 1 (Isi tanpa 0 / 62)"
            onChangeText={(e) => setInput({ ...inputan, whatsapputama: e })}  
          />
            <TextInput
             keyboardType='numeric'
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
              width: '80%',
              alignSelf: 'center',
              color: 'black'

            }}
            placeholderTextColor="grey" 
            placeholder="No. WhatsApp 2 (Isi tanpa 0 / 62)"
            onChangeText={(e) => setInput({ ...inputan, whatsapptambahan: e })}  
          />

<TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
        
              width: '80%',
              alignSelf: 'center',
              color: 'black'

            }}
            placeholderTextColor="grey" 
            placeholder="Hari Kunjungan"
            onChangeText={(e) => setInput({ ...inputan, hari: e })}  
          />

<TextInput
             keyboardType='numeric'
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
        
              width: '80%',
              alignSelf: 'center',
              color: 'black'

            }}
            placeholderTextColor="grey" 
            placeholder="Harga Produk"
            onChangeText={(e) => setInput({ ...inputan, harga: e })}  
          />

<View style={{flexDirection: 'row', marginHorizontal: 26, justifyContent: 'space-between'}}>
<View>

<View style={{backgroundColor: '#d3d3d3', width: 100, height: 100}}>
{imageKTP.uri ?
    <Image source={imageKTP} style={{width: 100, height: 100}} />

    :
<Text style={{textAlign: 'center', color: 'black', fontSize: 12, marginTop: 30, fontWeight: 'bold'}}>Foto KTP Belum Diunggah </Text>

}
</View>
<TouchableOpacity onPress={selectImageKTP} style={{backgroundColor: '#78C5FF', width: '70%', height: 30,  marginBottom: 14, borderRadius: 8, marginTop: 30, alignSelf: 'center'}}>
<Text style={{textAlign: 'center', marginTop:3, fontSize: 10, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Unggah</Text>

</TouchableOpacity>
</View>

<View>

<View style={{backgroundColor: '#d3d3d3', width: 100, height: 100}}>
  {image.uri ?
    <Image source={image} style={{width: 100, height: 100}} />

    :
<Text style={{textAlign: 'center', color: 'black', fontSize: 12, marginTop: 30, fontWeight: 'bold'}}>Foto Rumah Belum Diunggah </Text>

}
</View>
<TouchableOpacity onPress={selectImage} style={{backgroundColor: '#78C5FF', width: '70%', height: 30,  marginBottom: 14, borderRadius: 8, marginTop: 30, alignSelf: 'center'}}>
<Text style={{textAlign: 'center', marginTop:3, fontSize: 10, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Unggah</Text>

</TouchableOpacity>
</View>
</View>

<TextInput
             keyboardType='numeric'

            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
        
              width: '80%',
              alignSelf: 'center',
              color: 'black'

            }}
            placeholderTextColor="grey" 
            placeholder="Jumlah Galon"
            onChangeText={(e) => setInput({ ...inputan, jmlgalon: e })}  
          />

<TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
        
              width: '80%',
              alignSelf: 'center',
              color: 'black'

            }}
            placeholderTextColor="grey" 
            placeholder="Jenis Outlet"
            onChangeText={(e) => setInput({ ...inputan, jenisoutlet: e })}  
          />

          {loading ? 
        <ActivityIndicator size="large" color="black" />
        :
        <TouchableOpacity onPress={handleAdd} style={{backgroundColor: '#78C5FF', width: '70%', height: 40,  marginBottom: 14, borderRadius: 8, marginTop: 30, alignSelf: 'center'}

} 
           
              >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Simpan Data</Text>
    </TouchableOpacity>
        }

       </View>


</ScrollView>
 
     
    </View>
    <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          handleConfirm(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}

export default AddDataLeads

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        color: '#D8EDFD'
      },
})