import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'

import MainLogo from '../../assets/asapedia.png';
import ICPulsa from '../../assets/pulsa.png';
import ICData from '../../assets/data.png';
import ICEmoney from '../../assets/emoney.png';

import ICListrik from '../../assets/listrik.png';
import ICTagihan from '../../assets/bills.png';
import ICRefresh from '../../assets/refresh.png';
import ICPrio from '../../assets/crown.png';

import ICVoucher from '../../assets/voucher.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatRupiah } from '../../context/DateTimeServices';
import Fire from '../../config/Fire';
import { Dropdown } from 'react-native-element-dropdown';
import { Modal } from 'react-native-paper';




const Setting = ({navigation, route}) => {
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

const handleLogout = async () => {
  await AsyncStorage.clear()
  navigation.replace('Splash')
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

    <View style={{alignItems: 'center', marginTop: 20}}>
        <View style={{flexDirection: 'row'}}>
  <Text style={{color: '#2492FF', fontSize: 20, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{findSelf.nama} </Text>
   {findSelf.priority == "yes" &&
    <Image source={ICPrio} style={{width:25, height: 25, marginTop: 7, marginLeft: 5}} />
   }
   
        </View>
        {findSelf.priority == "yes" ?
  <Text style={{color: '#2492FF', fontSize: 18, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 10, marginLeft: 10}}>{"Priority Member"} </Text>
:
<Text style={{color: '#2492FF', fontSize: 20, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Regular Member"} </Text>

      }

<View style={{marginTop: 20, width: '95%'}}>
<TouchableOpacity style={styles.box} onPress={handleLogout} >
    <View style={{marginTop: 10}}>

    <Text style={{color: '#000080', fontSize: 20, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 8, width: '90%'}}>{"LOGOUT"} </Text>
<Text style={{color: '#000080', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 8, width: '100%'}}>{"Ketuk disini untuk logout"} </Text>


    </View>
    <View>


    </View>
</TouchableOpacity>
</View>

   
    </View>



</View>
        {/* Header */}



    </View>
    <Modal visible={loading}>
      <ActivityIndicator size="large" color="black" />
    </Modal>
    </>
  )

  
}

export default Setting

const styles = StyleSheet.create({
    box: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        height: 100,
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