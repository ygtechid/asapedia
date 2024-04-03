import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import HeaderSecondary from '../../component/Header/HeaderSecondary';
import { Dropdown } from 'react-native-element-dropdown';
import { ActivityIndicator, Modal, TextInput } from 'react-native-paper';
import axios from 'axios';
import { APIUrl, SIGNTOKENDEV, UNAME } from '../../context/APIUrl';
import cryptoJs from 'crypto-js';
import { formatRupiah } from '../../context/DateTimeServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fire from '../../config/Fire';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';

const DetailBuy = ({route, navigation}) => {
    const {params, nomorhp, gap} = route.params
    const refRBSheet = useRef();

    const [allPulsa, setAllPulsa] = useState([])
    console.log('psd', nomorhp);
    const [loading, setLoading] = useState(false)

    const [findSelf, setFindself] = useState({})    
    const [currentSaldo, setCurrentSaldo] = useState("")

const [uid, setUID] = useState("")

const gettoken = async () => {
    const getFindself =  await AsyncStorage.getItem('@findSelf')
    const parseFindself = JSON.parse(getFindself)

    await  Fire.database()
     .ref(`users/${parseFindself.username}/`)
     .once('value')
     .then((resDB) => {
      console.log('hasillogin', resDB.val());
      const respon = resDB.val()
     //  const parseFindself = JSON.parse(respon)
      setFindself(respon)
      setCurrentSaldo(formatRupiah(respon.saldo))
      console.log('getstor', formatRupiah(respon.saldo));
     })
    
 
    
 
 
 }


const handleBayar = async () => {
// refRBSheet.current.open()
    setLoading(true)
    if(findSelf.saldo >= totalBayar ) {
        const prefix = "ORDASA"
        const uniquenumber = Math.floor(Math.random() * 1000000);
       const token = prefix + uniquenumber
      console.log('token', token);


        try {
            const signedd = cryptoJs.MD5(UNAME + SIGNTOKENDEV + token).toString()
            await axios.post(`${APIUrl}/v1/legacy/index`, {
                commands: "topup",
                hp: nomorhp,
                pulsa_code: params.pulsa_code,
                ref_id: token,
                username: UNAME,
                sign: signedd
             }).then((res) => {
              console.log('respomn',res.data);
const datenow = moment().format("HH-MM-YYYY HH:mm:ss")

              const resp = res.data.data
              const dataKirimanFB = {
                uidPemesan: findSelf.uid,
                namaPemesan: findSelf.nama,
                uidPesanan: token,
                codePesaan: params.pulsa_code,
                namaPesanan: params.pulsa_op,
                nominalPesanan: params.pulsa_nominal,
                sign: token,
                totalBayar: totalBayar,
                tr_id: res.data.data.tr_id,
                originalPrice: res.data.data.price,
                status: "Diproses",
                priorityUser: findSelf.priority,
                tglTransaksi: datenow,
                type: "prepaid"
              }
              if(resp.status == 0) {
                try {

                    Fire.database()
                    .ref('order/' + token + '/')
                    .set(dataKirimanFB)
                    .then((resDB) => {
                        setLoading(false)

                        const penguranganSaldo = findSelf.saldo - totalBayar
                        Fire.database()
                            .ref('users/' + findSelf.username + '/')
                            .update({
                            saldo: penguranganSaldo
                            })

                        console.log('RES', res);
                        alert('Berhasil')

                        setTimeout(() => {
                        navigation.replace('DetailOrder', {
                            findSelf: findSelf,
                            data: dataKirimanFB
                        })
                            
                        }, 1500);
                   
                     
                    })
                   } catch (e) {
                      setLoading(false)
                      alert(e)
                   }
                    


              } else {
    setLoading(false)
                alert(res.data.data.message)
              }
            
              })
        } catch (e) {
    setLoading(false)
            
                console.log('err', e);
                alert(e)
        }
       
    } else {
    setLoading(false)
                                                                      
      alert('Saldo tidak cukup. Silahkan lakukan isi ulang terlebih dahulu')
    }
}


    const dataPulsa = [


        { label: 'Telkomsel', value: 'Telkomsel' },
        { label: 'Indosat', value: 'Indosat' },
        { label: 'XL', value: 'XL' },
        { label: 'Smartfren', value: 'Smart' },
        { label: 'Tri', value: 'Tri' },
        { label: 'by.U', value: 'by.U' },

        
      ];
      const [isFocus, setIsFocus] = useState(false);
      const [value, setValue] = useState(null);
      const [inputan, setInput] = useState({
       nomor: ""
      })

      


      const handleOrder = () => {
        if(inputan.nomor == "") {
            alert('Silahkan input nomor terlebih dahulu')
        }
      }
      const getPrice = async () => {

        const signedd = cryptoJs.MD5(UNAME + SIGNTOKENDEV + 'pl').toString()
        await axios.post(`${APIUrl}/v1/legacy/index`, {
            commands: "pricelist",
            status: "active",
            username: UNAME,
            sign: signedd
         }).then((res) => {
          console.log('respomn',res.data);
          const resp = res.data.data

         const sort = resp.sort((a, b) => a.pulsa_price - b.pulsa_price);
          console.log('ARRAYDA', sort);
          setAllPulsa(sort)
          })
      }

const totalBayar = params.pulsa_price + gap
      useEffect(() => {
            getPrice()
            gettoken()
      }, [])
      
  return (
    <>
    
    <View style={{backgroundColor: 'white', flex: 1}}>
        <HeaderSecondary title={"Checkout"}  onPress={() => navigation.goBack()}/>



    <ScrollView>
    <View style={{ marginTop: 10, marginLeft: 16, flex: 1}}>
    <Text style={{marginTop: 20, fontWeight: 'bold', color: 'black'}}>Anda memilih pembelian</Text>

    <TouchableOpacity style={styles.box} onPress={() =>  handleOrder(i)}>
    <View style={{marginTop: 10}}>
    <Image source={{uri: params.icon_url}} style={{width: 140, height: 50, marginTop: 10, marginRight: 16, marginLeft: 10}} />

<Text style={{color: '#000080', fontSize: 13, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{params.pulsa_op + " " + params.pulsa_nominal} </Text>
<Text style={{color: '#000080', fontSize: 13, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{params.pulsa_details} </Text>

<View style={{flexDirection: 'row'}}>

</View>
    </View>


  
</TouchableOpacity>
<Text style={{marginTop: 20, fontWeight: 'bold', color: 'black'}}>dengan nomor Tujuan</Text>
<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

<Text style={{marginTop: 20, fontWeight: 'bold', color: 'black', fontSize: 30}}>{nomorhp} </Text>
<Text style={{marginTop: 20, fontWeight: 'bold', color: 'blue', marginRight: 40}}
onPress={() => navigation.push('Buy', {
    params: params.pulsa_type
})}
>Ubah</Text>

</View>
<Text style={{marginTop: 20, fontWeight: 'bold', color: 'red'}}>Silahkan pastikan nomor sudah benar</Text>

<Text style={{marginTop: 20, fontWeight: 'bold', color: 'black'}}>Total Pembayaran</Text>
<Text style={{marginTop: 20, fontWeight: 'bold', color: 'black', fontSize: 30}}>{formatRupiah(totalBayar)} </Text>

<Text style={{marginTop: 20, fontWeight: 'bold', color: 'black'}}>Saldo Anda</Text>
<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
<Text style={{marginTop: 20, fontWeight: 'bold', color: 'black', fontSize: 30}}>{currentSaldo}</Text>
<Text style={{marginTop: 20, fontWeight: 'bold', color: 'blue', marginRight: 40}}
onPress={() => navigation.replace('Topup', {
    findSelf:findSelf
})}
>Isi Ulang</Text>

</View>

<TouchableOpacity style={{backgroundColor: '#78C5FF', width: '80%', alignSelf: 'center', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 50}} 
          onPress={handleBayar}
              >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Bayar</Text>
    </TouchableOpacity>
    </View>

        </ScrollView>
        <Modal visible={loading}>
            <ActivityIndicator size="large" color="black" />
        </Modal>

    </View>
    <RBSheet
        ref={refRBSheet}
        useNativeDriver={true}
        customStyles={{
          container: {
            height: 200,
            backgroundColor: '',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
          },
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>

<View>
<Text style={{color: 'black'}}>TESTING</Text>

</View>

            </RBSheet>
    </>
  )
}

export default DetailBuy

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
      },
      box: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        backgroundColor: 'white',
        paddingBottom: 20,
        borderRadius: 16,
        shadowColor: "#2492FF",
shadowOffset: {
	width: 0,
	height: 7,
},
shadowOpacity: 0.41,
shadowRadius: 9.11,

elevation: 14,

    },
      dropdown: {
        height: 50,
        width: '80%', 
        marginLeft: 0,
        marginTop: 10,
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
})