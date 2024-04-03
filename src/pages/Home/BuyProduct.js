import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import HeaderSecondary from '../../component/Header/HeaderSecondary';
import { Dropdown } from 'react-native-element-dropdown';
import { Modal, TextInput } from 'react-native-paper';
import axios from 'axios';
import { APIUrl, SIGNTOKENDEV, UNAME } from '../../context/APIUrl';
import cryptoJs from 'crypto-js';
import { formatRupiah } from '../../context/DateTimeServices';

const BuyProduct = ({route, navigation}) => {
    const {params, dataAkun} = route.params
    const [allPulsa, setAllPulsa] = useState([])
    const [gapPrice, setGapPrice] = useState(0)

    
    console.log('psd', dataAkun);
    const dataPulsa = [


        { label: 'Telkomsel', value: 'Telkomsel' },
        { label: 'Indosat', value: 'Indosat' },
        { label: 'XL', value: 'XL' },
        { label: 'Smartfren', value: 'Smart' },
        { label: 'Tri', value: 'Tri' },
        { label: 'by.U', value: 'by.U' },

        
      ];

      console.log('psd', dataAkun);
      const dataPLN = [
          { label: 'Token PLN', value: 'PLN' },
        ];

        const dataStreaming = [
          { label: 'Shopping Voucher', value: 'voucher' },

        ];



      const dataEtoll = [


        { label: 'Shopee Pay', value: 'Shopee Pay' },
        { label: 'LinkAja', value: 'LinkAja' },
        { label: 'DANA', value: 'DANA' },
        { label: 'GoPay', value: 'GoPay E-Money' },
        { label: 'OVO', value: 'OVO' },
        { label: 'MAXIM Driver', value: 'MAXIM' },

        { label: 'Mandiri E-Toll', value: 'Mandiri E-Toll' },
        { label: 'Mandiri E-Toll', value: 'Mandiri E-Toll' },
        { label: 'TapCash BNI', value: 'TapCash BNI' },
        
        { label: 'Indomaret Card E-Money', value: 'Indomaret Card E-Money' },



        
      ];

      const dataTagihan = [


        { label: 'BPJS', value: 'bpjs' },
        { label: 'Finance', value: 'finance' },
        { label: 'Pulsa Pascabayar', value: 'hp' },
        { label: 'Internet', value: 'internet' },
        { label: 'Pajak Kendaraan', value: 'pajak-kendaraan' },
        { label: 'PDAM', value: 'pdam' },

        { label: 'Tagihan PLN', value: 'pln' },
        { label: 'Mandiri E-Toll', value: 'Mandiri E-Toll' },
        { label: 'TapCash BNI', value: 'TapCash BNI' },
        
        { label: 'Indomaret Card E-Money', value: 'Indomaret Card E-Money' },



        
      ];


      const [isFocus, setIsFocus] = useState(false);
      const [loading, setLoading] = useState(false);

      const [value, setValue] = useState(null);
      const [dataDrop, setDataDrop] = useState([]);

      const [inputan, setInput] = useState({
       nomor: ""
      })

      



      const handleOrder = (item) => {
        if(inputan.nomor == "") {
            alert('Silahkan input nomor terlebih dahulu')
        } else {
            navigation.push('DetailBuy', {
                params: item,
                nomorhp: inputan.nomor,
                gap: gapPrice
            })
        }
      }
      const getPrice = async () => {
        setLoading(true)
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

          if(dataAkun.priority == "yes") {
            setGapPrice(300)
          } else {
            setGapPrice(500)

          }

          if(params == "pulsa" || params == "data") {
            setDataDrop(dataPulsa)
          } else if(params == "etoll") {
            setDataDrop(dataEtoll)
          } else if(params == "pln"){
          setDataDrop(dataPLN)

          } else if (params == "vouch") {
            setDataDrop(dataStreaming)
          }
        })
          
          setLoading(false)

      }


      useEffect(() => {
            getPrice()
      }, [])
      
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
        <HeaderSecondary title={"Beli " + params}  onPress={() => navigation.goBack()} />


    <ScrollView>
    <View style={{marginLeft: 16}}>
      
      
      <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataDrop}
            search
            maxHeight={300}
            itemContainerStyle={{color: 'black'}}
            itemTextStyle={{color: 'black'}}

            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Pilih Produk' : '...'}
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
    
    {/* <Text style={{marginTop: 20, color: "black"}}>Silahkan Input Nomor</Text> */}
    <TextInput
    mode='outlined'
    label="nomor"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
            
              borderRadius: 12,
              marginBottom: 8,
              marginTop: 10,
              width: '90%',
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
{params == "vouch" &&

<Text style={{marginTop: 10, color: 'red', width: '90%'}}>Silahkan masukkan nomor whatsapp aktif. Kode voucher akan kami kirimkan melalui whatsapp dan tersedia juga di detail transaksi</Text>
}
<Text style={{marginTop: 20, fontWeight: 'bold', color: 'black'}}>Pilih Produk</Text>



{/* MAPPING DATA HARGA */}

{params !== "vouch" ?

value !== null &&

allPulsa.filter((e) => e.pulsa_type == params && e.pulsa_op.includes(value)).map((i, index) => {
    return (
        <View>


<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>


</View>
<TouchableOpacity style={styles.box} onPress={() =>  handleOrder(i)}>
    <View style={{marginTop: 10}}>
    <Image source={{uri: i.icon_url}} style={{width: 140, height: 50, marginTop: 10, marginRight: 16, marginLeft: 10}} />

<Text style={{color: '#000080', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{i.pulsa_op + " " + i.pulsa_nominal} </Text>
<View style={{flexDirection: 'row'}}>
<Text style={{color: '#000080', fontSize: 20, fontWeight: 'bold', marginLeft: 10, fontFamily: 'Poppins-Bold', marginTop: 10,}}>{formatRupiah(i.pulsa_price + gapPrice)} </Text>

</View>
    </View>


  
</TouchableOpacity>
        </View>
    )
}) 


:
value !== null &&

allPulsa.filter((e) => e.pulsa_category == value).map((i, index) => {
    return (
        <View>


<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>


</View>
<TouchableOpacity style={styles.box} onPress={() =>  handleOrder(i)}>
    <View style={{marginTop: 10}}>
    <Image source={{uri: i.icon_url}} style={{width: 140, height: 50, marginTop: 10, marginRight: 16, marginLeft: 10}} />

<Text style={{color: '#000080', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{i.pulsa_op + " " + i.pulsa_nominal} </Text>
<View style={{flexDirection: 'row'}}>
<Text style={{color: '#000080', fontSize: 20, fontWeight: 'bold', marginLeft: 10, fontFamily: 'Poppins-Bold', marginTop: 10,}}>{formatRupiah(i.pulsa_price + gapPrice)} </Text>

</View>
    </View>


  
</TouchableOpacity>
        </View>
    )
}) 

}

{/* END OF MAPPING DATA HARGA */}
    </View>
        </ScrollView>
  
<Modal visible={loading}>
  <ActivityIndicator size="large" color="black" /> 
</Modal>
    </View>
  )
}

export default BuyProduct

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
        paddingBottom: 20,
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
        width: '90%', 
        color: 'black',
        marginLeft: 0,
        marginTop: 20,
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