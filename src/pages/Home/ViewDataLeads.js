import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text,ActivityIndicator, TouchableOpacity, View, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import QRCode from 'react-native-qrcode-svg';
import FotoRumah from '../../assets/rumah.png'
import FotoKTP from '../../assets/ktp.png'
import HeaderSecondary from '../../component/Header/HeaderSecondary';
import Fire from '../../config/Fire';
import moment from 'moment';
import { conversiDateTimeIDN } from '../../context/DateTimeServices';
import { Modal } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';


const ViewDataLeads = ({navigation, route}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
   const {data} = route.params;
   console.log('itemlengkap', data);
   const [openStatus, setOpenStatus] = useState(false);
  const [valueStatus, setValueStatus] = useState(data.status);
    const [findSelf, setFindself] = useState({})
    const [openSource, setOpenSource] = useState(false);
    const [image, setImage] = useState([]);
    const [imageKTP, setImageKTP] = useState([]);
    const [valueSource, setValueSource] = useState(data.source);
  const [datas, setDatas] = useState(data)
  const [visibleSelesai, setVisibleSelesai] = useState(false)
  const dataBayar = [
    { label: 'Tunai', value: 'tunai' },
    { label: 'QRIS', value: 'qris' },
    { label: 'Piutang', value: 'piutang' },

   
  ];
    const [inputan, setInput] = useState({
      name: data.name,
      alamat: data.alamat,
      whatsapputama: data.whatsapputama,
      whatsapptambahan: data.whatsapptambahan,
      hari: data.hari,
      harga: data.harga,
      jmlgalon: data.jmlgalon,
      jenisoutlet: data.jenisoutlet,
      marketing: data.marketing,
      tanggalinput: data.tanggalinput,
      cabang: data.cabang,
      team: data.team

        
      })
      const [date, setDate] = useState(new Date())
      const [loading, setLoading] = useState(false)


      const [dateConfirm, setDateConfirm] = useState(data.date)

     
      const [open, setOpen] = useState(false)
      console.log('tanggal', dateConfirm);

      const totalharga = parseInt(data.harga) * parseInt(data.jmlgalon)

    const gettoken = async () => {
       const getToken =  await AsyncStorage.getItem('@token')
       const getFindself =  await AsyncStorage.getItem('@findSelf')
       const getUID =  await AsyncStorage.getItem('@userid')
        const parseFindself = JSON.parse(getFindself)
        setFindself(parseFindself)
        console.log('getstor', getUID);
    }
    
    
    const handleConfirm = (currentDate) => {
        const tgl = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
        const bln = currentDate.getMonth() + 1 < 10 ? "0" + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
        var jdw = currentDate.getFullYear() + "/" + bln + "/" + tgl;
        console.log(jdw);
      
        setDateConfirm(jdw);
       
      };
  



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
      Geolocation.getCurrentPosition(info => console.log('lokasi', info));
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

const openMaps = () => {
  alert('Google Maps Belum ada API')
}

const kirimWhatsApp = () => {
  Linking.openURL('http://wa.me/62' + data.whatsapputama)
}

const updateData = () => {
  const datez = new Date()
  const datenos = conversiDateTimeIDN(datez)
  const getTime = moment().format('h:mm:ss')
  try {
    setLoading(true)
    Fire.database()
    .ref('order/' + data.id + '/')
    .update({
      status: "Diambil",
      driver: findSelf.nama,
      tglambil: datenos,
      jamambil: getTime

    }).then((resDB) => {
      setLoading(false)
      axios.post('https://api.fonnte.com/send', {
        target: data.whatsapputama,
        message: "*[PESAN DARI APLIKASI AXIRO AIR MINUM ISI ULANG]* \n \nPesanan anda sedang dalam pengiriman oleh driver kami. Mohon ditunggu. \n \n Terima Kasih, \n AXIRO MANAGEMENT"
      }, {
        headers: {
          Authorization: 'F1b9L7Rn9dq@@9okuqmK'
        }
      })
      alert('Pesanan Berhasil Diambil. Segera menuju lokasi pelanggan')
      setTimeout(() => {
          navigation.replace('MyTabs')
      }, 2000);
    })
  } catch (e) {
    setLoading(false)
    alert(e)
  }
  
}

const handleSelesai = () => {
  const datez = new Date()
  const datenos = conversiDateTimeIDN(datez)
  const getTime = moment().format('h:mm:ss')
  try {
    setLoading(true)
    Fire.database()
    .ref('order/' + data.id + '/')
    .update({
      status: "Selesai",
      driver: findSelf.nama,
      tglselesai: datenos,
      jamselesai: getTime,
      pembayaran: value

    }).then((resDB) => {
      setLoading(false)
      setVisibleSelesai(false)
      axios.post('https://api.fonnte.com/send', {
        target: data.whatsapputama,
        message: "*[PESAN DARI APLIKASI AXIRO AIR MINUM ISI ULANG]* \n \nPesanan anda sudah selesai kami proses. Senang dapat membantu memenuhi kebutuhan air mineral anda. Semoga sehat selalu. \n \n Terima Kasih, \n AXIRO MANAGEMENT"
      }, {
        headers: {
          Authorization: 'F1b9L7Rn9dq@@9okuqmK'
        }
      })
      alert('Pesanan Selesai! Terima kasih atas kerja keras anda')
      setTimeout(() => {
          navigation.replace('MyTabs')
      }, 2000);
    })
  } catch (e) {
    setLoading(false)
    alert(e)
  }
  
}
useEffect(() => {
    gettoken()
   
}, [])


  return (
    <>
    
    <View style={{flex: 1, backgroundColor: 'white'}}>
     <HeaderSecondary title={"Detail Order"}  />
   

<ScrollView>
  <View>
  <View style={{padding: 16}}>

<View style={{alignItems: 'center'}}>
<Text style={{fontSize: 12, color: 'grey', marginTop: 2, marginBottom: 5}}>{"Tanggal Input : " + data.tanggalinput} </Text>
{data.status !== "Pesanan Dibuat" &&
<Text style={{fontSize: 12, color: 'grey', marginTop: 2, marginBottom: 10}}>{"Tanggal Kirim : " + data.tglambil + " - " + data.jamambil} </Text>

}
<QRCode
  value={data.id}
  size={150}
/>
{findSelf.role == "Driver" && data.status == "Pesanan Dibuat" ?
loading ?
<ActivityIndicator size="large" color="black" />
:
<TouchableOpacity onPress={updateData} style={{backgroundColor: 'green', width: '70%', height: 40,  marginBottom: 5, borderRadius: 8, marginTop: 16, alignSelf: 'center'}

} 
       
          >
    <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Ambil Pesanan</Text>
</TouchableOpacity>
:
null
}

{findSelf.role == "Driver" && data.status == "Diambil" ?
loading ?
<ActivityIndicator size="large" color="black" />
:
<TouchableOpacity onPress={() => setVisibleSelesai(true)} style={{backgroundColor: 'red', width: '70%', height: 40,  marginBottom: 5, borderRadius: 8, marginTop: 16, alignSelf: 'center'}

} 
       
          >
    <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Selesaikan Pesanan</Text>
</TouchableOpacity>
:
null
}
<View style={{flexDirection: 'row'}}>


<Text style={{fontSize: 12, color: 'grey', marginTop: 10}}>Status Pesanan :</Text>

<Text style={{marginTop: 10, fontSize: 12, color: 'black', fontWeight: 'bold'}}>{data.status}</Text>
</View>
{data.status == "Selesai" &&
<Text style={{fontSize: 12, color: 'grey', marginTop: 10}}>{"Pembayaran via " + data.pembayaran}</Text>
}
<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 12, color: 'grey', marginTop: 10}}>Harga Produk :</Text>
<Text style={{marginTop: 10, fontSize: 12, color: 'black', fontWeight: 'bold'}}>{'Rp ' + data.harga}</Text>
</View>

<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 12, color: 'grey', marginTop: 10}}>Marketing : </Text>
<Text style={{marginTop: 10, fontSize: 12, color: 'black', fontWeight: 'bold'}}>{data.marketing}</Text>
</View>

</View>
</View>

<View style={styles.box}>
<Text style={{fontSize: 12, color: 'black', marginTop: 10, fontWeight: 'bold'}}>{data.name} </Text>
<Text style={{fontSize: 12, color: 'black', marginTop: 5, fontWeight: '300'}}>{data.alamat} </Text>
<Text style={{fontSize: 12, color: 'black', marginTop: 5, fontWeight: '300'}}>{"Hari Kunjungan " + data.hari} </Text>
<Text style={{fontSize: 12, color: 'black', marginTop: 5, fontWeight: '300'}}>{data.whatsapputama} </Text>
<Text style={{fontSize: 12, color: 'black', marginTop: 5, fontWeight: '300'}}>{data.whatsapptambahan} </Text>
<Text style={{fontSize: 12, color: 'black', marginTop: 5, fontWeight: '300'}}>{"Jumlah Galon " + data.jmlgalon} </Text>
</View>


<View style={[styles.box, {
  height: 470
}]}>
<Text style={{fontSize: 12, color: 'black', marginTop: 10, fontWeight: 'bold'}}>Foto Lokasi </Text>
<Image source={FotoRumah} style={{width: 200, height: 200, marginTop: 20}} />
<Image source={FotoKTP} style={{width: 220, height: 150, marginTop: 20}} />

</View>


<TouchableOpacity 
onPress={openMaps} 
style={{backgroundColor: '#78C5FF', width: '70%', height: 40,  marginBottom: 14, borderRadius: 8, marginTop: 16, alignSelf: 'center'}

} 
       
          >
    <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Arahkan Ke Lokasi</Text>
</TouchableOpacity>

<TouchableOpacity onPress={kirimWhatsApp} style={{backgroundColor: 'green', width: '70%', height: 40,  marginBottom: 14, borderRadius: 8, marginTop: 3, alignSelf: 'center'}

} 
       
          >
    <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Kirim WhatsApp</Text>
</TouchableOpacity>

  </View>
</ScrollView>
  

    
    </View>
   <Modal visible={visibleSelesai}>
      <View style={{width: 300, height: 300, alignSelf: 'center',borderRadius: 15, backgroundColor: 'white'}}>
<Text style={{fontSize: 12, color: 'black', marginTop: 10, textAlign: 'center', fontWeight: 'bold'}}>SELESAIKAN PESANAN </Text> 


<Text style={{fontSize: 10, color: 'black', marginTop: 16, marginLeft: 16, fontWeight: '400'}}>Metode Pembayaran yang Digunakan</Text> 
<Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dataBayar}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          
        />
<Text style={{fontSize:  10, color: 'black', marginTop: 16, marginLeft: 16, fontWeight: 'bold'}}>Jumlah Pembayaran</Text> 
<Text style={{fontSize:  10, color: 'black', marginTop: 7, marginLeft: 16, fontWeight: '400'}}>{"Harga Produk        : Rp " + data.harga}</Text> 
<Text style={{fontSize:  10, color: 'black', marginTop: 7, marginLeft: 16, fontWeight: '400'}}>{"Jumlah Galon        : " + data.jmlgalon}</Text> 
<Text style={{fontSize:  10, color: 'black', marginTop: 7, marginLeft: 16, fontWeight: '400'}}>{"Total Bayar            : Rp " + totalharga}</Text> 
<TouchableOpacity onPress={handleSelesai} style={{backgroundColor: 'red', width: '70%', height: 40,  marginBottom: 5, borderRadius: 8, marginTop: 16, alignSelf: 'center'}

} 
       
          >
    <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Selesaikan Pesanan</Text>
</TouchableOpacity>

      </View>
   </Modal>
    </>
  )
}

export default ViewDataLeads

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        color: '#D8EDFD'
      },
      container: {
        backgroundColor: 'white',
        padding: 16,
      },
      dropdown: {
        height: 50,
        width: '80%', 
        marginLeft: 16,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      box:{width: '90%', height: 150, backgroundColor: 'white', marginTop: 10, marginLeft: 20,
      shadowColor: "#000",
      paddingHorizontal: 16,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      
      elevation: 16,}
})