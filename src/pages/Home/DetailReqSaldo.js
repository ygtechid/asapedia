import { Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderSecondary from '../../component/Header/HeaderSecondary';
import QRCode from 'react-native-qrcode-svg';
import { formatRupiah } from '../../context/DateTimeServices';
import { TouchableOpacity } from 'react-native';

const DetailReqSaldo = ({route,navigation}) => {

    const {findSelf,data} = route.params;

    console.log('liri', data);

        const handleLapor = () => {
            Linking.openURL('https://t.me/asapedia_official')
        }
  return (
    <View style={{flex: 1}}>
        <HeaderSecondary title="Detail Order"  onPress={() => navigation.replace('MyTabs')}/>
      <Text style={{color: 'black', marginTop: 16, fontWeight: 'bold', textAlign: 'center'}}>Selamat Permintaan isi saldo anda Berhasil Dibuat!</Text>
   <View style={{alignSelf: 'center', marginTop: 16}}>
   <QRCode 
    value={data.idRequest}
    size={150}
    />
    </View>
      <Text style={{color: 'black', marginTop: 16, fontWeight: '400', textAlign: 'center'}}>{"ID Req Saldo : " + data.idRequest} </Text>
    <View style={{backgroundColor: 'white', width: '100%', marginTop: 20, padding: 10, height: 80}}>
    <Text style={{color: 'black', fontWeight: '300'}}>{"Status Pengisian"} </Text>
    <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: 5}}>{data.status} </Text>


    </View>
    <View style={{backgroundColor: 'white', width: '100%', marginTop: 3, padding: 10, height: 80}}>
    <Text style={{color: 'black', fontWeight: '300'}}>{"Pengisian melalui"} </Text>
    <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: 5}}>{data.via} </Text>


    </View>
    <View style={{backgroundColor: 'white', width: '100%', marginTop: 3, padding: 10, height: 80}}>
    <Text style={{color: 'black', fontWeight: '300'}}>{"Nominal Pengisian"} </Text>
    <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: 5}}>{formatRupiah(data.nominal)} </Text>


    </View>
    <TouchableOpacity style={{backgroundColor: 'red', width: '80%', alignSelf: 'center', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 50}} 
               onPress={handleLapor}
               >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Laporkan Kendala</Text>
    </TouchableOpacity>
   </View>

   
  )
}

export default DetailReqSaldo

const styles = StyleSheet.create({})