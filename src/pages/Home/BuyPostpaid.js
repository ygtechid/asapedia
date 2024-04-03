import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import HeaderSecondary from '../../component/Header/HeaderSecondary';
import { Dropdown } from 'react-native-element-dropdown';
import { Modal, TextInput } from 'react-native-paper';
import axios from 'axios';
import { APIUrl, APIUrlPostpaid, SIGNTOKENDEV, UNAME } from '../../context/APIUrl';
import cryptoJs, { format } from 'crypto-js';
import { formatRupiah } from '../../context/DateTimeServices';
import moment from 'moment';
import Fire from '../../config/Fire';

const BuyPostpaid = ({route, navigation}) => {
    const {params, dataAkun} = route.params
    const [allPulsa, setAllPulsa] = useState([])
    const [gapPrice, setGapPrice] = useState(0)

    
   

      const dataTagihan = [

        { label: 'Listrik', value: 'pln' },

        { label: 'BPJS', value: 'bpjs' },
        { label: 'TV', value: 'tv' },
        { label: 'Finance', value: 'finance' },
        { label: 'Pulsa Pascabayar', value: 'hp' },
        { label: 'Internet', value: 'internet' },
        { label: 'Pajak Kendaraan', value: 'pajak-kendaraan' },
        { label: 'PDAM', value: 'pdam' },
        { label: 'Pendidikan', value: 'pendidikan' },


      



        
      ];
      const [isFocus, setIsFocus] = useState(false);
      const [loading, setLoading] = useState(false);
      const [visibleCheck, setVisibleCheck] = useState(false);


      const [value, setValue] = useState(null);
      const [dataDrop, setDataDrop] = useState([]);
      const [dataInq, setDataInq] = useState({});


      const [inputan, setInput] = useState({
       nomor: ""
      })

      



      const getInquiry = async (item) => {
        console.log('ISSS', item);
        setLoading(true)
        const prefix = "ORDASA"
        const uniquenumber = Math.floor(Math.random() * 1000000);
       const token = prefix + uniquenumber
      console.log('token', token);
    
        if(value == "bpjs") {
            try {
                const signedd = cryptoJs.MD5(UNAME + SIGNTOKENDEV + token).toString()
                await axios.post(`${APIUrlPostpaid}/api/v1/bill/check`, {
                    commands: "inq-pasca",
                    code: item.code,
                    hp: inputan.nomor,
                    username: UNAME,
                    sign: signedd,
                    ref_id: token, 
                    month: "1"
                 }).then((res) => {
            setLoading(false)
                    
                  const resp = res.data.data
                  console.log('respomn',res.data.data);
    
                  if(resp.response_code == "00") {
                    setVisibleCheck(true)
                    setDataInq(resp)
                  } else {
                    alert(resp.message)
                  }
               
                
                })
        
            } catch (e) {
                setLoading(true)
                alert(e)
            }  
        } else {
            try {
                const signedd = cryptoJs.MD5(UNAME + SIGNTOKENDEV + token).toString()
                await axios.post(`${APIUrlPostpaid}/api/v1/bill/check`, {
                    commands: "inq-pasca",
                    code: item.code,
                    hp: inputan.nomor,
                    username: UNAME,
                    sign: signedd,
                    ref_id: token
                 }).then((res) => {
            setLoading(false)
                    
                  const resp = res.data.data
                  console.log('respomn',res.data.data);
    
                  if(resp.response_code == "00") {
                    setVisibleCheck(true)
                    setDataInq(resp)
                  } else {
                    alert(resp.message)
                  }
               
                
                })
        
            } catch (e) {
                setLoading(true)
                alert(e)
            }  
        }
         
      }

      const getPrice = async () => {
        setLoading(true)
        const signedd = cryptoJs.MD5(UNAME + SIGNTOKENDEV + 'pl').toString()
        await axios.post(`${APIUrlPostpaid}/api/v1/bill/check`, {
            commands: "pricelist-pasca",
            status: "active",
            username: UNAME,
            sign: signedd
         }).then((res) => {
          console.log('respomn',res.data.data.pasca);
          const resp = res.data.data.pasca
          setAllPulsa(resp)

          if(dataAkun.priority == "yes") {
            setGapPrice(300)
          } else {
            setGapPrice(500)

          }

          if(params == "pulsa" || params == "data") {
            setDataDrop(dataPulsa)
          } else if(params == "etoll") {
            setDataDrop(dataEtoll)
          } else if(params == "pln")
          setDataDrop(dataPLN)

          })
          setLoading(false)

      }

      const handleBayar = async () => {
        setVisibleCheck(false)
        setLoading(true)
        if(dataAkun.saldo >= dataInq.price) {
            try {
                const signedd = cryptoJs.MD5(UNAME + SIGNTOKENDEV + dataInq.tr_id).toString()
                await axios.post(`${APIUrlPostpaid}/api/v1/bill/check`, {
                    commands: "pay-pasca",
                    tr_id: dataInq.tr_id,
                    username: UNAME,
                    sign: signedd,
                 }).then((res) => {
            setLoading(false)
    
                  const resp = res.data.data
                  console.log('respomn',res.data.data);
                  const datenow = moment().format("HH-MM-YYYY HH:mm:ss")
                  const dataKirimanFB = {
                    uidPemesan: dataAkun.uid,
                    namaPemesan: dataAkun.nama,
                    uidPesanan: dataInq.ref_id,
                    codePesaan: dataInq.code,
                    namaPesanan: dataInq.code,
                    nominalPesanan: dataInq.price,
                    sign: dataInq.ref_id,
                    totalBayar: dataInq.price,
                    tr_id: dataInq.tr_id,
                    originalPrice: dataInq.selling_price,
                    status: "Diproses",
                    priorityUser: dataAkun.priority,
                    tglTransaksi: datenow,
                    type: "postpaid"
                  }
                  if(resp.message == "PAYMENT SUCCESS") {
                    try {
            
                        Fire.database()
                        .ref('order/' + dataInq.ref_id + '/')
                        .set(dataKirimanFB)
                        .then((resDB) => {
                            setLoading(false)
            
                            const penguranganSaldo = dataAkun.saldo - dataInq.price
                            Fire.database()
                                .ref('users/' + dataAkun.username + '/')
                                .update({
                                saldo: penguranganSaldo
                                })
            
                            console.log('RES', res);
                            alert('Berhasil')
            
                            setTimeout(() => {
                            navigation.replace('DetailOrder', {
                                findSelf: dataAkun,
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
                setLoading(true)
                alert(e)
            } 
        } else {
            setLoading(false)
            alert('Saldo tidak cukup. Silahkan isi ulang terlebih dahulu sebelum melanjutkan. ')
        }
      }
      useEffect(() => {
            getPrice()
      }, [])
      
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
        <HeaderSecondary title={"Bayar " + params} onPress={() => navigation.goBack()} />


    <ScrollView>
    <View style={{marginLeft: 16}}>
      
      
      <Text style={{marginTop: 20, color: 'black'}}>Silahkan pilih Produk</Text>
      <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataTagihan}
            search
            maxHeight={300}
            itemContainerStyle={{color: 'black'}}
            itemTextStyle={{color: 'black'}}

            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Pilih item' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
            
          />
     
   

    {value !== null &&
    <>
    
    <TextInput
    mode='outlined'
    label="Nomor Pengguna / Nomor Pelanggan"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
            
              borderRadius: 12,
              marginBottom: 8,
              marginTop: 10,
              width: '80%',
              color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Nomor Pengguna"
            keyboardType='numeric'
        //    defaultValue={data.name}

            onChangeText={(e) => setInput({ ...inputan, nomor: e })}  
          />
    </>
}
{params == "pln" &&

<Text style={{marginTop: 20, color: 'red', width: '90%'}}>Pembayaran tagihan Listrik PLN silahkan melalui fitur Tagihan</Text>
}
<Text style={{marginTop: 20, fontWeight: 'bold', color: 'black'}}>Pilih Produk</Text>


{value !== null &&

allPulsa.filter((e) => e.type.includes(value)).map((i, index) => {
    return (
        <View>


<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

</View>
<TouchableOpacity style={styles.box} onPress={() =>  getInquiry(i)}>
    <View style={{marginTop: 10}}>

<Text style={{color: '#000080', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{i.name} </Text>
<Text style={{color: '#000080', fontSize: 12, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Biaya admin"} </Text>

<View style={{flexDirection: 'row'}}>
<Text style={{color: '#000080', fontSize: 20, fontWeight: 'bold', marginLeft: 10, fontFamily: 'Poppins-Bold', marginTop: 10,}}>{i.fee == 0 ? "Gratis!" :  formatRupiah(i.fee)} </Text>

</View>
    </View>


  
</TouchableOpacity>
        </View>
    )
})

}

    </View>
        </ScrollView>
  
<Modal visible={loading}>
  <ActivityIndicator size="large" color="black" /> 
</Modal>
<Modal visible={visibleCheck} onDismiss={() => setVisibleCheck(false)}>
    <View style={{backgroundColor: 'white', width: 300, height: 300, alignSelf: 'center'}}>
    <Text style={{color: '#000080', fontSize: 20, fontWeight: 'bold', marginLeft: 10, fontFamily: 'Poppins-Bold', marginTop: 10,}}>Detail Pembayaran </Text>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Nama Pelanggan"} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10, marginRight: 10}}>{dataInq ? dataInq.tr_name : "xxxx"} </Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Nominal"} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10, marginRight: 10}}>{dataInq.nominal ? formatRupiah(dataInq.nominal) : 0} </Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Biaya admin"} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10, marginRight: 10}}>{dataInq.nominal ? formatRupiah(dataInq.admin) : "0"} </Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Total Bayar"} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10, marginRight: 10}}>{dataInq.nominal ? formatRupiah(dataInq.price) : 0} </Text>
    </View>
    <TouchableOpacity style={{backgroundColor: '#78C5FF', width: '80%', alignSelf: 'center', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 50}} 
             onPress={handleBayar} >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Bayar dengan Saldo</Text>
    </TouchableOpacity>
    </View>
</Modal>

    </View>
  )
}

export default BuyPostpaid

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
        height: 130,
        backgroundColor: 'white',
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
        color: 'black',
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
        color: 'black'

      },
      placeholderStyle: {
        fontSize: 16,
        color: 'black'
      },
      selectedTextStyle: {
        fontSize: 16,
        color: 'black'

      },
      iconStyle: {
        width: 20,
        height: 20,
        color: 'black'

      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: 'black'

      },
})