import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import MainLogo from '../../assets/asapedia.png';

import ICPrio from '../../assets/crown.png';
import ICRefresh from '../../assets/refresh.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { Modal } from 'react-native-paper';
import Fire from '../../config/Fire';
import { formatRupiah } from '../../context/DateTimeServices';




const Transaction = ({navigation, route}) => {
// const {findSelf} = route.params;
// console.log('oard', findSelf);
const [findSelf, setFindself] = useState({})
const [currentSaldo, setCurrentSaldo] = useState("")
const [loading, setLoading] = useState("")


const [uid, setUID] = useState("")
const [isFocus, setIsFocus] = useState(false);
const [value, setValue] = useState(null);
const [dataDrop, setDataDrop] = useState([]);


const dataTrx = [
    { label: 'Pembelian', value: 'Pembelian' },
    { label: 'Isi Saldo', value: 'Saldo' },
  ];
const [dataOrders, setDataOrders] = useState([])
const [dataSaldo, setDataSaldo] = useState([])



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

const handleRefresh = async () => {
  try {
    setLoading(true)
    Fire.database()
    .ref('order/')
    .once('value')
    .then((resDB) => {
        const datled = []
        console.log('hasilleads', datled)
        const value = resDB.val()
        if (value) {
            Object.keys(value).map((item) => {
                datled.push(value[item]);
           
            });
           
            const allFilterData = datled
            console.log('hasil', datled);
            setDataOrders(datled)
  setLoading(false)
  
            // setAllDataLeads(allFilterData)
          
          }
    }
    )
  } catch (e) {
setLoading(false)
alert('Terdapat kesalahan')
  }

}

const geteReqSaldo = async () => {

  try {
    setLoading(true)
    Fire.database()
    .ref('reqsaldo/')
    .once('value')
    .then((resDB) => {
        const datled = []
        console.log('hasilsaldo', datled)
        const value = resDB.val()
        if (value) {
            Object.keys(value).map((item) => {
                datled.push(value[item]);
           
            });
           
            const allFilterData = datled
            console.log('hasilsaldo', datled);
            setDataSaldo(datled)
      setLoading(false)
  
            // setAllDataLeads(allFilterData)
          
          }
    }
    )
  } catch (e) {
    alert('Terdapat kesalahan')
  }
 
}

const handleDetail = (item) => {
  console.log('itmsssssss', item);

  if(item.uidPesanan !== undefined) {
    navigation.push('DetailOrder', {
      findSelf: findSelf,
      data: item
    })
  } else {
    navigation.push('ReqSaldo', {
      findSelf: findSelf,
      data: item
    })
  }
}
useEffect(() => {
 gettoken()
  handleRefresh()
  geteReqSaldo()
}, [])

  return (
    <>
    
    <View style={{flex: 1, backgroundColor: 'white'}}>

        {/* Header */}
        <View style={{backgroundColor: 'white', marginTop: 10, height: 100, marginLeft: 10, width: '100%', padding: 10,  flexDirection: 'row'}}>
        <Image source={MainLogo} style={{width: 40, height: 40}} />
        <Text style={{color: '#2492FF', fontSize: 18, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>ASAPEDIA</Text>
        </View>
<View style={{marginTop: -20, marginLeft: 16}}>
  
  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

    <View>
        <View style={{flexDirection: 'row'}}>
        <Text style={{color: '#2492FF', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{findSelf ? "Selamat Datang, " + findSelf.nama : "Selamat Datang, .... "} </Text>
   {findSelf.priority == "yes" &&
    <Image source={ICPrio} style={{width:25, height: 25, marginTop: 3, marginLeft: 5}} />
   }
   
        </View>
   
<Text style={{color: '#2492FF', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{dataOrders.length + dataSaldo.length + " Transaksi"} </Text>
    </View>

   <TouchableOpacity onPress={handleRefresh}>

    <Image source={ICRefresh} style={{width: 30, height: 30, marginRight: 30}} />
   </TouchableOpacity>
  </View>



</View>
        {/* Header */}

<ScrollView>

<View style={{marginTop: 20, marginLeft: 20, marginBottom: 300}}> 
      <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataTrx}
            search
            maxHeight={300}
            itemContainerStyle={{color: 'black'}}
            itemTextStyle={{color: 'black'}}

            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Pilih Transaksi' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
            
          />

{value == "Pembelian" ?

          <View>
          <Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 30, marginLeft: 10}}>{"Klik untuk melihat Detail"} </Text>

{dataOrders.filter((e) => e.uidPemesan == findSelf.uid).length > 0 ?
dataOrders.filter((e) => e.uidPemesan == findSelf.uid).map((i, index) => {
  return (
<TouchableOpacity style={styles.box} onPress={() => handleDetail(i)}>
    <View style={{marginTop: 10}}>

<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{i.tglTransaksi} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 10, marginLeft: 8}}>{i.uidPesanan} </Text>
<Text style={{color: '#000080', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 8, width: '70%'}}>{i.namaPesanan} </Text>


    </View>
    <View>
    <Text style={{color: 'red', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 10, marginRight: 10}}>{"- " +  formatRupiah(i.totalBayar)} </Text>
    <Text style={{color: 'red', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 10, marginLeft: 40}}>{"Saldo"} </Text>

    </View>
</TouchableOpacity>
  )
})
  
:

<Text style={{color: '#000080', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 8, width: '70%', textAlign: 'center'}}>Belum ada transaksi </Text>
}

          </View>
          :
          value == "Saldo" ?
          <View>
          <Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 30, marginLeft: 10}}>{"Klik untuk melihat Detail"} </Text>

{dataSaldo.filter((e) => e.idPengguna == findSelf.uid).length > 0 ?
dataSaldo.filter((e) => e.idPengguna == findSelf.uid).map((i, index) => {
  return (
<TouchableOpacity style={styles.box} onPress={() => handleDetail(i)}>
    <View style={{marginTop: 10}}>

<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{i.tglTransaksi} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 10, marginLeft: 8}}>{i.idRequest} </Text>
<Text style={{color: '#000080', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 8, width: '70%'}}>{i.via} </Text>


    </View>
    <View>
    <Text style={{color: 'green', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 10, marginRight: 10}}>{"+ " +  formatRupiah(i.nominal)} </Text>
    <Text style={{color: 'green', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 10, marginLeft: 50}}>{"Saldo"} </Text>

    </View>
</TouchableOpacity>
  )
})
  
:

<Text style={{color: '#000080', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 8, width: '70%', textAlign: 'center'}}>Belum ada transaksi </Text>
}

          </View>
          :
          <Text style={{color: '#000080', fontSize: 16, marginLeft: -20, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 20, textAlign: 'center'}}> Silahkan pilih transaksi</Text>

}

</View>
</ScrollView>

    </View>
    <Modal visible={loading}>
      <ActivityIndicator size="large" color="black" />
    </Modal>
    </>
  )

  
}

export default Transaction

const styles = StyleSheet.create({
    box: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        height: 120,
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
    boxmenu: {width: 80, 
        marginLeft: 10,
        marginTop:  16,
        height: 80, borderRadius: 80 / 2, justifyContent: 'center', backgroundColor: 'white',
    shadowColor: "#2492FF",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    
    elevation: 14,},
    container: {
        backgroundColor: 'white',
        padding: 16,
      },
     
      dropdown: {
        height: 50,
        width: '90%', 
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