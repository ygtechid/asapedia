import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'

import MainLogo from '../../assets/asapedia.png';
import ICPulsa from '../../assets/pulsa.png';
import ICData from '../../assets/data.png';
import ICEmoney from '../../assets/emoney.png';

import ICListrik from '../../assets/listrik.png';
import ICTagihan from '../../assets/bills.png';
import ICRefresh from '../../assets/refresh.png';
import ICPrio from '../../assets/crown.png';
import ICNokos from '../../assets/telephone.png';
import ICStream from '../../assets/stream.png';
import ICSosmed from '../../assets/socmed.png';
import ICMeterai from '../../assets/materai.png';
import ICHotel from '../../assets/hotel.png';




import cryptoJs from 'crypto-js';

import ICVoucher from '../../assets/coupon.png';
import ICGame from '../../assets/voucher.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatRupiah } from '../../context/DateTimeServices';
import Fire from '../../config/Fire';
import { APIIDRIYEN, APIKEYNS, APIKEYRIYEN, APIUrlNusantara, APIUrlRiyen, USERIDNS, USERIDRIYEN } from '../../context/APIUrl';
import axios from 'axios';




const Home = ({navigation, route}) => {
// const {findSelf} = route.params;
// console.log('oard', findSelf);
const [findSelf, setFindself] = useState({})
const [currentSaldo, setCurrentSaldo] = useState("")
const [loading, setLoading] = useState("")


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

const handleRefresh = async () => {

    setLoading(true)
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
    setLoading(false)

    })
}

const getRiyen = async () => {

    try {
        await axios.post(`${APIUrlRiyen}/api/services`, {
            api_id: APIIDRIYEN,
            api_key: APIKEYRIYEN
        }).then((res) => {
        console.log('respomn',res.data);
       
       })
    } catch (e) {
        console.log('er', e.response.data);
    }
       
}

// const getNusantara = async () => {
//     const signedd = cryptoJs.MD5(USERIDNS + APIKEYRIYEN).toString()
//         await axios.post(`${APIUrlNusantara}/api/services`, {
//            api_id: USERIDNS,
//             api_key: APIKEYNS

//      }).then((res) => {
//     //   console.log('respomn',res.data);
     
//      })
// }

useEffect(() => {
 gettoken()
 getRiyen()
}, [])

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{backgroundColor: 'white', marginTop: 10, height: 100, marginLeft: 10, width: '100%', padding: 10,  flexDirection: 'row'}}>
        <Image source={MainLogo} style={{width: 40, height: 40}} />
        <Text style={{color: '#2492FF', fontSize: 18, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>ASAPEDIA</Text>
        </View>

<View style={{marginTop: -20, marginLeft: 16}}>
    <View>
        <View style={{flexDirection: 'row'}}>
        <Text style={{color: '#2492FF', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{findSelf ? "Selamat Datang, " + findSelf.nama : "Selamat Datang, .... "} </Text>
   {findSelf.priority == "yes" &&
    <Image source={ICPrio} style={{width:25, height: 25, marginTop: 3, marginLeft: 5}} />
   }
   
        </View>
{findSelf.priority == "yes" ?
<Text style={{color: '#2492FF', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Priority Member"} </Text>
:
<Text style={{color: '#2492FF', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Regular Member"} </Text>

}
    </View>
<View style={styles.box}>
    <View style={{marginTop: 10}}>

<Text style={{color: '#000080', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Saldo Anda"} </Text>
<View style={{flexDirection: 'row'}}>

{loading ?
<ActivityIndicator size="large" color="black" />
:
<Text style={{color: '#000080', fontSize: 24, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 10, marginLeft: 8}}>{currentSaldo} </Text>

}
<TouchableOpacity onPress={handleRefresh}>
<Image source={ICRefresh} style={{width: 30, height: 30, marginTop: 13}}/>

</TouchableOpacity>
</View>
    </View>

<TouchableOpacity onPress={() => navigation.push('Topup', {
    findSelf: findSelf
})} style={{backgroundColor: '#2492FF', height: 60, width: 60,
marginRight: 10,
marginTop: 20,
borderRadius: 10, }}>
<Text style={{color: 'white', fontSize: 44, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginLeft: 8}}>{"+"} </Text>

</TouchableOpacity>
</View>

<View>
<Text style={{color: 'black', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10, marginTop: 20}}>{"Layanan"} </Text>

<View style={{marginTop: 10}}>
    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        
        <TouchableOpacity onPress={() => navigation.push('Buy', {
            params: "pulsa",
            dataAkun: findSelf
        })}>
        <View style={styles.boxmenu}>
        <Image source={ICPulsa} style={{width: 30, height: 30, alignSelf: 'center'}} />
        </View>
        <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 20, marginTop: 10}}>{"Pulsa"} </Text>

            </TouchableOpacity>
          

            <TouchableOpacity onPress={() => navigation.push('Buy', {
            params: "data",
            dataAkun: findSelf

        })}>

        <View style={styles.boxmenu}>
        <Image source={ICData} style={{width: 30, height: 30, alignSelf: 'center'}} />
        </View>
<Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 5, marginTop: 10}}>{"Paket Data"} </Text>

</TouchableOpacity>


<TouchableOpacity onPress={() => navigation.push('Buy', {
            params: "etoll",
            dataAkun: findSelf

        })}>

          <View style={styles.boxmenu}>
        <Image source={ICEmoney} style={{width: 30, height: 30, alignSelf: 'center'}} />
        </View>   
<Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 12, marginTop: 10}}>{"E-Money"} </Text>
</TouchableOpacity>


<TouchableOpacity onPress={() => navigation.push('Buy', {
            params: "pln",
            dataAkun: findSelf

        })}>
        <View style={styles.boxmenu}>
        <Image source={ICListrik} style={{width: 30, height: 30, alignSelf: 'center'}} />
        </View>
<Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 20, marginTop: 10}}>{"Listrik"} </Text>

            </TouchableOpacity>

    </View>
</View>

<View style={{marginTop: 10}}>
    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        
   
          

<TouchableOpacity onPress={() => navigation.push('Postpaid', {
    params: "Tagihan",
    dataAkun: findSelf
})}>

        <View style={styles.boxmenu}>
        <Image source={ICTagihan} style={{width: 30, height: 30, alignSelf: 'center'}} />
        </View>

<Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 20, marginTop: 10}}>{"Tagihan"} </Text>

</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.push('BuyOTP', {
    params: "Streaming",
    dataAkun: findSelf
})}>

        <View style={styles.boxmenu}>
        <Image source={ICStream} style={{width: 30, height: 30, alignSelf: 'center'}} />
        </View>

<Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 13, marginTop: 10}}>{"Streaming"} </Text>

</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.push('BuyOTP', {
    params: "OTP",
    dataAkun: findSelf
})}>

        <View style={styles.boxmenu}>
        <Image source={ICNokos} style={{width: 30, height: 30, alignSelf: 'center'}} />
        </View>

<Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 28, marginTop: 10}}>{"OTP"} </Text>

</TouchableOpacity>



<TouchableOpacity onPress={() => navigation.push('Buy',{
    params: "vouch",
    dataAkun: findSelf
})}>

          <View style={styles.boxmenu}>
        <Image source={ICVoucher} style={{width: 30, height: 30, alignSelf: 'center'}} />
        </View>   
        <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 17, marginTop: 10}}>{"Voucher"} </Text>

</TouchableOpacity>
    </View>
</View>

<View style={{marginTop: 10}}>
    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        
        <TouchableOpacity onPress={() => alert('Segera Hadir')}>
        <View style={styles.boxmenu}>
        <Image source={ICGame} style={{width: 30, height: 30, alignSelf: 'center'}} />
        </View>
        <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 20, marginTop: 10}}>{"Game"} </Text>

            </TouchableOpacity>
          

            <TouchableOpacity onPress={() => navigation.push('BuyOTP', {
            params: "socmed",
            dataAkun: findSelf

        })}>

        <View style={styles.boxmenu}>
        <Image source={ICSosmed} style={{width: 30, height: 30, alignSelf: 'center'}} />
        </View>
<Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 16, marginTop: 10}}>{"Socmed"} </Text>

</TouchableOpacity>

<TouchableOpacity onPress={() => alert('Segera Hadir')}>

        <View style={styles.boxmenu}>
        <Image source={ICMeterai} style={{width: 30, height: 30, alignSelf: 'center'}} />
        </View>
<Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 5, marginTop: 10}}>{"E-Materai"} </Text>

</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.push('Buy', {
            params: "data",
            dataAkun: findSelf

        })}>

        <View style={styles.boxmenu}>
        <Image source={ICHotel} style={{width: 30, height: 30, alignSelf: 'center'}} />
        </View>
<Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 20, marginTop: 10}}>{"Promo \n Hotel"} </Text>

</TouchableOpacity>


    </View>
</View>


</View>
</View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    box: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        height: 100,
        backgroundColor: 'white',
        borderRadius: 16,
        alignSelf: 'center',
        shadowColor: "#2492FF",
shadowOffset: {
	width: 0,
	height: 7,
},
shadowOpacity: 0.41,
shadowRadius: 9.11,

elevation: 14,

    },
    boxmenu: {width: 60, 
        marginLeft: 10,
        marginTop:  16,
        height: 60, borderRadius: 80 / 2, justifyContent: 'center', backgroundColor: 'white',
    shadowColor: "#2492FF",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    
    elevation: 14,}
})