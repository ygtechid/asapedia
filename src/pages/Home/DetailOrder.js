import { ActivityIndicator, Image, Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderSecondary from '../../component/Header/HeaderSecondary';
import QRCode from 'react-native-qrcode-svg';
import { formatRupiah } from '../../context/DateTimeServices';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fire from '../../config/Fire';
import { APIKEYNS, APIUrl, APIUrlNusantara, APIUrlPostpaid, SIGNTOKENDEV, UNAME, USERIDNS } from '../../context/APIUrl';
import axios from 'axios';
import cryptoJs from 'crypto-js';
import ICRefresh from '../../assets/refresh.png';



const DetailOrder = ({route, navigation}) => {

    const {findSelf, data} = route.params;
    const [statusOrder, setStatusOrder] = useState({})
    const [loading, setLoading] = useState(false)


    console.log('ordd', data);
    const getStatus = async () => {
      
      setLoading(true)
        
      if(data.type == "prepaid" || data.type == "postpaid") {
        try {
          if(data.type == "prepaid") {
            const signedd = cryptoJs.MD5(UNAME + SIGNTOKENDEV + data.uidPesanan).toString()
            await axios.post(`${APIUrl}/v1/legacy/index`, {
              commands: 'inquiry',
              username: UNAME,
                ref_id: data.uidPesanan,
                sign: signedd
            }).then((res) => {
        setLoading(false)
  
              console.log('responss', res.data.data);
              setStatusOrder(res.data.data)
             })
          } else {
            const signedd = cryptoJs.MD5(UNAME + SIGNTOKENDEV + 'cs').toString()
            await axios.post(`${APIUrlPostpaid}/api/v1/bill/check`, {
                commands: "checkstatus",
                ref_id: data.uidPesanan,
                username: UNAME,
                sign: signedd
             }).then((res) => {
        setLoading(false)
  
              console.log('responsPOSTPAID', res.data.data);
              setStatusOrder(res.data.data)
             })
          }
         

        } catch (err) {
      setLoading(false)

          console.log('tdd', err.response);
        }
      } else if(data.type == "otp") {
        try {
        
            const signedd = cryptoJs.MD5(UNAME + SIGNTOKENDEV + 'cs').toString()
            await axios.get('https://otpweb.net/api?api_key=01e5847ed4eb05cf0b7983af915258cb31c74f85&action=get_status&order_id=' + data.tr_id).then((res) => {
        setLoading(false)
  
              console.log('responsOTP', res.data.data);
              setStatusOrder(res.data.data)
             })
          
         

        } catch (err) {
      setLoading(false)

          console.log('tdd', err);
        }
      } else {
        try {
          setLoading(true)
          await axios.post(`${APIUrlNusantara}/api/status`, {
            api_id: USERIDNS,
            api_key: APIKEYNS,
            id: "80686"
          }).then((res) => {
            setLoading(false)
            console.log('res', res.data);
            setStatusOrder(res.data)
          })
        } catch (e) {
          setLoading(false)
          alert(e.response.data)
        }
      }
    
     
    }

    
    const handleRefund = async () => {


      const refundProc = findSelf.saldo + data.totalBayar
      setLoading(true)

      if(data.type !== "otp") { 
      try {
        Fire.database()
        .ref('users/' + findSelf.username + '/')
        .update({
        saldo: refundProc,
        }).then((resDB) => {
          console.log('ress', resDB);
        setLoading(false)
        Fire.database()
        .ref('order/' + data.uidPesanan + '/')
        .update({
        status: "Refund",
        }).then((resDB) => {
          alert('Refund Saldo Berhasil!')
          setTimeout(() => {
            navigation.replace('MyTabs')
          }, 1000);
        })
         
        })
      } catch (e) {
        setLoading(false)
        alert(e)
      }
    } else {
      try {
        await axios.get('https://otpweb.net/api?api_key=01e5847ed4eb05cf0b7983af915258cb31c74f85&action=set_status&order_id=' + data.tr_id + '&status=cancel').then((res) => {
          Fire.database()
        .ref('users/' + findSelf.username + '/')
        .update({
        saldo: refundProc,
        }).then((resDB) => {
          console.log('ress', resDB);
        setLoading(false)
        Fire.database()
        .ref('order/' + data.uidPesanan + '/')
        .update({
        status: "Refund",
        }).then((resDB) => {
          alert('Pembatalan Pesanan & Refund Saldo Berhasil!')
          setTimeout(() => {
            navigation.replace('MyTabs')
          }, 1000);
        })
         
        })
        })
        
      } catch (e) {
        console.log('errr', e.response.data.messages);
        setLoading(false)
        alert(e.response.data.messages)
      }
    }
     
    
    }

    const handleDone = async () => {


      setLoading(true)

         
      try {
        await axios.get('https://otpweb.net/api?api_key=01e5847ed4eb05cf0b7983af915258cb31c74f85&action=set_status&order_id=' + data.tr_id + '&status=done').then((res) => {
         
        setLoading(false)
        Fire.database()
        .ref('order/' + data.uidPesanan + '/')
        .update({
        status: "SUCCESS",
        }).then((resDB) => {
          alert('Pesanan Sudah Berhasil!')
          setTimeout(() => {
            navigation.replace('MyTabs')
          }, 1000);
        })
         
       
        })
        
      } catch (e) {
        console.log('errr', e.response.data.messages);
        setLoading(false)
        alert(e.response.data.messages)
      }
         
    
    }

    useEffect(() => {
      getStatus()
    }, [])
    

    console.log('liri', data);

        const handleLapor = () => {
            Linking.openURL('https://t.me/asapedia_official')
        }
  return (
    <View style={{flex: 1}}>
        <HeaderSecondary title="Detail Order"  onPress={() => navigation.replace('MyTabs')}/>
      <Text style={{color: 'black', marginTop: 16, fontWeight: 'bold', textAlign: 'center'}}>Selamat Pesanan anda Berhasil Dibuat!</Text>
   <ScrollView>
    <View>
    <View style={{alignSelf: 'center', marginTop: 16}}>
   <QRCode 
    value={data.uidPesanan}
    size={150}
    />
     

    </View>
    {data.type == "streaming" &&
    <View style={{width: '90%', paddingBottom: 20, backgroundColor: '#78C5FF', borderRadius: 5, alignSelf: 'center', marginTop: 20}}>
 
    <Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 20, marginLeft: 10, textAlign: 'center', paddingHorizontal: 10}}>{"Akun akan dikirim melalui WhatsApp terdaftar. \nEstimasi pengiriman 15-30 menit pada jam kerja 07.00 - 22.00 WIB"} </Text>
    </View>
    
    }
      <Text style={{color: 'black', marginTop: 16, fontWeight: '400', textAlign: 'center'}}>{"ID Pesanan : " + data.uidPesanan} </Text>
    <View style={{backgroundColor: 'white', width: '100%', marginTop: 20, padding: 10, height: 80}}>
    <Text style={{color: 'black', fontWeight: '300'}}>{"Status Pesanan"} </Text>
    <View style={{flexDirection: 'row'}}>

    {loading ?
  <ActivityIndicator size="large" color="black" />
  :
  <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: 5}}>{data.type !== "otp" && data.type !== "streaming" && data.type !== "socmed" ? statusOrder.message : data.status} </Text>

  }
   <TouchableOpacity onPress={getStatus}>

    <Image source={ICRefresh} style={{width: 25, height: 25, marginTop:7, marginLeft: 6}} />
   </TouchableOpacity>


    </View>


    </View>
    <View style={{backgroundColor: 'white', width: '100%', marginTop: 3, padding: 10, height: 80}}>
    <Text style={{color: 'black', fontWeight: '300'}}>{"Nama Pesanan"} </Text>
    <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: 5}}>{data.namaPesanan + data.nominalPesanan} </Text>


    </View>
    <View style={{backgroundColor: 'white', width: '100%', marginTop: 3, padding: 10, height: 80}}>
    <Text style={{color: 'black', fontWeight: '300'}}>{"Total Bayar"} </Text>
    <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: 5}}>{formatRupiah(data.totalBayar)} </Text>


    </View>

    {data.type !== "streaming"  ?
       <View style={{backgroundColor: 'white', width: '100%', marginTop: 3, padding: 10, height: 80}}>
       <Text style={{color: 'black', fontWeight: '300'}}>{data.type !== "otp" ?  "Nomor/Data Tujuan" : "Nomor OTP (Silahkan masukkan nomor ini)"} </Text>
       <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: 5}}>{statusOrder.hp ? statusOrder.hp : statusOrder.number} </Text>
   
   
       </View>
       :
       <View style={{backgroundColor: 'white', width: '100%', marginTop: 3, padding: 10, height: 80}}>
       <Text style={{color: 'black', fontWeight: '300'}}>{"Akun"} </Text>
       <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: 5}}>{data.status == "BERHASIL" ? "Akun Sudah dikirim ke WhatsApp " +  findSelf.whatsapp : "Akun Sedang Diproses"} </Text>
   
   
       </View>
  }
 
    {data.type == "otp" && data.status !== "Refund" &&
    <View style={{backgroundColor: 'white', width: '100%', marginTop: 3, padding: 10,   paddingBottom: 20}}>
    <Text style={{color: 'black', fontWeight: '300'}}>{"KODE OTP"} </Text>
    <View style={{flexDirection: 'row'}}>

    {loading ?
  <ActivityIndicator size="large" color="black" />
  :
  <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16, marginTop: 5}}>{statusOrder.SMS == "" ? "Belum Ada" : statusOrder.SMS} </Text>
  }
   <TouchableOpacity onPress={getStatus}>

    <Image source={ICRefresh} style={{width: 25, height: 25, marginTop:7, marginLeft: 6}} />
   </TouchableOpacity>
    </View>


    </View>
    }
    
    {
    
    statusOrder.message == 'SUCCESS' &&
    <View style={{backgroundColor: 'white', width: '100%', marginTop: 3, padding: 10, height: 80, paddingBottom: 20}}>
    <Text style={{color: 'black', fontWeight: '300'}}>{"Serial Number / Token"} </Text>
    <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18, marginTop: 5}}>{statusOrder.sn} </Text>


    </View>
}


{data.type == "prepaid" ?
data.status !== "Refund" && statusOrder.message !== "SUCCESS" && statusOrder.message !== "PROCCESS" && loading == false ?
<TouchableOpacity style={{backgroundColor: 'red', width: '80%', alignSelf: 'center', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 20}} 
               onPress={handleRefund}
               >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}}>Klik untuk Refund Saldo</Text>
    </TouchableOpacity>
    
    :
    null
  :
  data.type == "postpaid" &&
  statusOrder.message !== "PAYMENT SUCCESS" && statusOrder.status !== "Refund" && loading == false ?
  <TouchableOpacity style={{backgroundColor: 'red', width: '80%', alignSelf: 'center', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 20}} 
                 onPress={handleRefund}
                 >
          <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}}>Klik untuk Refund Saldo</Text>
      </TouchableOpacity>
  :
  null
  }


{data.type == "otp" && statusOrder.status !== "received" && statusOrder.status !== "SUCCESS" && loading == false &&
<TouchableOpacity style={{backgroundColor: 'red', width: '80%', alignSelf: 'center', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 20}} 
               onPress={handleRefund}
               >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}}>Nomor Tidak Bisa Dipakai</Text>
    </TouchableOpacity>
}

{data.type == "otp" && statusOrder.status == "received" &&
<TouchableOpacity style={{backgroundColor: 'green', width: '80%', alignSelf: 'center', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 20}} 
               onPress={handleDone}
               >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}}>Pesanan Selesai</Text>
    </TouchableOpacity>
}

<TouchableOpacity style={{backgroundColor: 'red', width: '80%', alignSelf: 'center', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 10}} 
               onPress={handleLapor}
               >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Laporkan Kendala</Text>
    </TouchableOpacity>
    </View>
   </ScrollView>
   

{/* {data.type == "prepaid" ?
 statusOrder.message !== "SUCCESS" && statusOrder.status !== "Refund" &&
<TouchableOpacity style={{backgroundColor: 'red', width: '80%', alignSelf: 'center', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 20}} 
               onPress={handleRefund}
               >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}}>Klik untuk Refund Saldo</Text>
    </TouchableOpacity>
    
    :
    statusOrder.message !== "PAYMENT SUCCESS" && statusOrder.status !== "Refund" &&
    <TouchableOpacity style={{backgroundColor: 'red', width: '80%', alignSelf: 'center', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 20}} 
                   onPress={handleRefund}
                   >
            <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}}>Klik untuk Refund Saldo</Text>
        </TouchableOpacity>
       
      
} */}



   </View>

   
  )
}

export default DetailOrder

const styles = StyleSheet.create({})