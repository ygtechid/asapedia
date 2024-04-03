import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import HeaderSecondary from '../../component/Header/HeaderSecondary'
import { formatRupiah } from '../../context/DateTimeServices'
import { Dropdown } from 'react-native-element-dropdown'
import { Modal, TextInput } from 'react-native-paper'
import Fire from '../../config/Fire'
import moment from 'moment'
import axios from 'axios'
import ICQris from '../../assets/qris.jpg';


const TopupSaldo = ({route, navigation}) => {


    const {findSelf} = route.params
    const [modalSaldo, setModalSaldo] = useState(false)
    const [inputan, setInput] = useState({
        nominal: "",
        namarekening: ""
       })

       
       
    const [rekening, setNoRekening] = useState({
        nomor: "",
        nama: ""
    })

    const handleModal = () => {
        
        if(value == "BCA") {
            setNoRekening({
                nomor: "7740796814",
                nama: "Ayogi Kurniawan"
            })
        } else if(value == "Dana") {
            setNoRekening({
                nomor: "085175274746",
                nama: "Ayogi Kurniawan"
            })
        } else {
            setNoRekening({
                nomor: "",
                nama: ""
            })
        }
        setModalSaldo(true)

    }

  const handleTopup = async () => {
    setLoading(true)

    const prefix = "ASASLD"
    const uniquenumber = Math.floor(Math.random() * 1000000);
   const token = prefix + uniquenumber
   const datenow = moment().format("HH-MM-YYYY HH:mm:ss")

   const dataKirims = {
    idPengguna: findSelf.uid,
    nominal: inputan.nominal,
    via: value,
    status: "Diproses",
    idRequest: token,
    tglTransaksi: datenow,
    namaPengirim: inputan.namarekening
   }
    try {
        Fire.database()
        .ref('reqsaldo/' + token + '/')
        .set(dataKirims)
        .then((resDB) => {
            setLoading(false)
            axios.post('https://api.fonnte.com/send', {
              target: '085794196626',
              message: "*[TOPUP]* \n \n Ada yang topup dengan data id Pengguna " + findSelf.uid + "username " + findSelf.nama + " Nominal " + inputan.nominal + " Dari rekening " + inputan.namarekening + " Pada TANGGAL " + datenow + " via " + value 
            }, {
              headers: {
                Authorization: 'F1b9L7Rn9dq@@9okuqmK'
              }
            })
           
            console.log('RES', resDB);
            alert('Berhasil')

            setTimeout(() => {
            navigation.replace('ReqSaldo', {
                findSelf: findSelf,
                data: dataKirims
            })
                
            }, 1500);
       
         
        })
       } catch (e) {
          setLoading(false)
          alert(e)
       }
  }
    
    const dataTopup = [


        // { label: 'Bank BCA', value: 'BCA' },
        // { label: 'DANA', value: 'Dana' },
        { label: 'QRIS', value: 'QRIS' },

       

        
      ];

      const [isFocus, setIsFocus] = useState(false);
      const [loading, setLoading] = useState(false);

      const [value, setValue] = useState(null);

  return (
    <>
    
    <View styles={{flex: 1, backgroundColor: 'white'}}>
        <HeaderSecondary title="Isi Saldo"  onPress={() => navigation.goBack()}/>
        <View styles={{marginTop: 20, marginleft: 16}}> 
        <View style={styles.box}>
    <View style={{marginTop: 10}}>

<Text style={{color: '#000080', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Saldo Anda"} </Text>
<Text style={{color: '#000080', fontSize: 24, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 10, marginLeft: 8}}>{formatRupiah(findSelf.saldo) } </Text>
    </View>
</View>


<Text style={{color: '#000080', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 16, marginTop: 20}}>{"Isi Saldo"} </Text>
<Dropdown
itemContainerStyle={{color: 'black'}}
itemTextStyle={{color: 'black'}}
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataTopup}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Pilih Metode' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
            
          />

<View style={{marginLeft: 16}}>
<>
<Text style={{marginTop: 20, color: 'black'}}>Silahkan Input Nominal</Text>
    <TextInput
      mode='outlined'
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
            
              borderRadius: 12,
              marginBottom: 8,
              marginTop: 10,
              width: '95%',
              color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Nominal minimal Rp 50.000"
        //    defaultValue={data.name}

            onChangeText={(e) => setInput({ ...inputan, nominal: e })}  
          />
</>
</View>

<View style={{marginLeft: 16}}>
<>
<Text style={{marginTop: 20, color: 'black'}}>Silahkan Input Nama Pengirim</Text>
    <TextInput
      mode='outlined'
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
            
              borderRadius: 12,
              marginBottom: 8,
              marginTop: 10,
              width: '95%',
              color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Nama Rekening Pengirim"
        //    defaultValue={data.name}

            onChangeText={(e) => setInput({ ...inputan, namarekening: e })}  
          />
</>
</View>

{/* <Text style={{color: '#000080', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 16, marginTop: 20}}>{"Silahkan melakukan transfer ke rekening berikut"} </Text>
<Text style={{color: '#000080', fontSize: 20, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 16, marginTop: 20}}>{rekening.nomor} </Text> */}
{parseInt(inputan.nominal) >= 50000 &&
    <TouchableOpacity style={{backgroundColor: '#78C5FF', width: '80%', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 30, alignSelf: 'center'}} 
             onPress={() => handleModal()} >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Selanjutnya</Text>
    </TouchableOpacity>
}

        </View>
    </View>
    <Modal visible={modalSaldo} onDismiss={() => setModalSaldo(false)}>
    <View style={{width: 300, paddingBottom: 20, alignSelf: 'center',borderRadius: 15, backgroundColor: 'white'}}>
      
    <Text style={{color: '#000080', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 16, marginTop: 20}}>{"Nominal Transfer"} </Text>
    <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 16, marginTop: 10}}>{formatRupiah(inputan.nominal)} </Text>

    <Text style={{color: '#000080', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 16, marginTop: 20}}>{"Silahkan scan QRIS Berikut"} </Text>
  <Image source={ICQris} style={{width: 200, height: 200, alignSelf: 'center'}} />
    
    {loading ?
    <ActivityIndicator size="large" color="black" />
    :    
    <TouchableOpacity 
    onPress={handleTopup}
    
    style={{backgroundColor: 'red', width: '70%', height: 40,  marginBottom: 5, borderRadius: 8, marginTop: 20, alignSelf: 'center'}
}
       
          >
    <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Sudah Transfer</Text>
</TouchableOpacity>
}
   


        </View>   
    </Modal>
    </>
  )
}

export default TopupSaldo

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
      },
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
      dropdown: {
        height: 50,
        width: '90%', 
        marginLeft: 16,
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
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: 'black'

      },
})