import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import HeaderSecondary from '../../component/Header/HeaderSecondary';
import { Dropdown } from 'react-native-element-dropdown';
import { Modal, TextInput } from 'react-native-paper';
import axios from 'axios';
import { APIIDRIYEN, APIKEYNS, APIKEYRIYEN, APIUrl, APIUrlNusantara, APIUrlRiyen, SIGNTOKENDEV, UNAME, USERIDNS } from '../../context/APIUrl';
import cryptoJs from 'crypto-js';
import { formatRupiah } from '../../context/DateTimeServices';
import moment from 'moment';
import Fire from '../../config/Fire';

const BuyOtp = ({route, navigation}) => {
    const {params, dataAkun} = route.params
    console.log('ss', params);
    const [allPulsa, setAllPulsa] = useState([])
    const [dataSocmeds, setDataSocmed] = useState([])

    const [gapPrice, setGapPrice] = useState(0)
    const [visibleCheck, setVisibleCheck] = useState(false);
    const [visibleCheckStream, setVisibleCheckStream] = useState(false);
    const [visibleCheckSocmed, setVisibleCheckSocmed] = useState(false);


    const [dataInq, setDataInq] = useState({});
    const [dataDrop, setDataDrop] = useState([]);
    const [dataStreaming, setDataStreaming] = useState([]);




      const dataNokos = [


        { label: 'WhatsApp', value: 'Whatsapp' },
        { label: 'Telegram', value: 'Telegram' },
        { label: 'Instagram', value: 'Instagram' },
        { label: 'X', value: 'Twitter' },
        { label: 'Shopee', value: 'Shopee' },
        { label: 'Lazada', value: 'Lazada' },
        { label: 'Bukalapak', value: 'Bukalapak' },
        { label: 'TikTok', value: 'TikTok/Douyin' },
        { label: 'Tiketcom', value: 'Tiket.com' },
        { label: 'Gmail', value: 'Google,YouTube,Gmail' },
        { label: 'Apple', value: 'Apple' },


        
      ];

      const dataStream = [


        { label: 'Netflix', value: 'Netflix' },
        { label: 'Spotify', value: 'Spotify' },
        { label: 'Vidio Platinum', value: 'Vidio'},
        { label: 'Disney Hotstar', value: 'Disney+ Hotstar' },
        { label: 'Viu', value: 'Viu' },
        { label: 'Youtube', value: 'Youtube'},
        { label: 'Prime Video', value: 'Prime Video'},
        { label: 'Canva', value: 'Canva'},





        


        
      ];

      const dataSocmed = [


        { label: 'Followers Instagram Indo', value: 'Instagram Followers Indonesia' },
        { label: 'Followers Instagram', value: 'Instagram Followers S-' },
        { label: 'Like Instagram Indonesia', value: 'Instagram Likes Indonesia' },
        { label: 'Like Instagram', value: 'Instagram Likes S-' },
        { label: 'View Reels', value: 'Instagram - Views' },
        { label: 'View Reels', value: 'Instagram - Views' },
        { label: 'Followers Tiktok', value: 'Tiktok Followers S-' },
        { label: 'Like TikTok', value: 'TikTok Likes S-' },
        { label: 'View TikTok Indonesia', value: 'TikTok Views Indonesia' },
        { label: 'Share TikTok', value: 'TikTok Video Share S-' },
        { label: 'Twitter Followers', value: 'Twitter Followers S-' },





        


        
      ];

    

     

      const [isFocus, setIsFocus] = useState(false);
      const [loading, setLoading] = useState(false);

      const [value, setValue] = useState(null);

      const [inputan, setInput] = useState({
       link: ""
      })

      console.log('inputan', inputan);
      const [inputOrder, setInputOrder] = useState({
        qty: 0
       })
      

       const handleSocmed = async () => {


        const prefix = "ORDASA"
        const uniquenumber = Math.floor(Math.random() * 1000000);
       const token = prefix + uniquenumber
        const priz = dataInq.price + gapPrice
       console.log('HIUTNG', inputOrder.qty * priz / 1000);
        try {
            setVisibleCheckSocmed(false)
            setLoading(true)
            if(dataAkun.saldo >= dataInq.price) {
                await axios.post(`${APIUrlNusantara}/api/order`, {
                    api_id: USERIDNS,
                    api_key: APIKEYNS,
                    service: dataInq.id,
                    target: inputan.link,
                    quantity: 1000
                }).then((res) => {
                    const resp = res.data
                    console.log('respomn',res.data);
                    const datenow = moment().format("HH-MM-YYYY HH:mm:ss")
        const priz = dataInq.price + gapPrice
        const prizInitiate = inputOrder.qty * dataInq.price / 1000
                    const prices = inputOrder.qty * priz / 1000
                    const dataKirimanFB = {
                      uidPemesan: dataAkun.uid,
                      namaPemesan: dataAkun.nama,
                      uidPesanan: token,
                      codePesaan: dataInq.id,
                      namaPesanan: dataInq.name,
                      nominalPesanan: inputOrder.qty,
                      sign: token,
                      totalBayar: dataInq.price + gapPrice,
                      tr_id: token,
                      originalPrice: dataInq.price,
                      status: "Diproses",
                      priorityUser: dataAkun.priority,
                      tglTransaksi: datenow,
                      type: "socmed"
                    }
                    if(resp.status == true) {
                      try {
              
                          Fire.database()
                          .ref('order/' + token + '/')
                          .set(dataKirimanFB)
                          .then((resDB) => {
                              setLoading(false)
              
                              const penguranganSaldo = dataAkun.saldo - dataKirimanFB.totalBayar
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
                } else {
                    setLoading(false)
                alert('Saldo tidak cukup. Silahkan isi ulang terlebih dahulu sebelum melanjutkan. ')  
                }
        } catch (e) {
            setVisibleCheckSocmed(false)

            setLoading(false)
            console.log('ERRR', e.response);
        }
        
       }
      const handleBayar = async () => {
        setVisibleCheck(false)
        setLoading(true)
        const prefix = "ORDASA"
        const uniquenumber = Math.floor(Math.random() * 1000000);
       const token = prefix + uniquenumber
        if(params !== "socmed" && dataAkun.saldo >= dataInq.cost) {

            if(params == "OTP") {
                try {
                    const signedd = cryptoJs.MD5(UNAME + SIGNTOKENDEV + dataInq.tr_id).toString()
                    await axios.get('https://otpweb.net/api?api_key=01e5847ed4eb05cf0b7983af915258cb31c74f85&action=get_number&country_id=6&service_id=' + dataInq.service_id).then((res) => {
                setLoading(false)
        
                      const resp = res.data
                      console.log('respomn',res.data);
                      const datenow = moment().format("HH-MM-YYYY HH:mm:ss")
                      const dataKirimanFB = {
                        uidPemesan: dataAkun.uid,
                        namaPemesan: dataAkun.nama,
                        uidPesanan: token,
                        codePesaan: dataInq.service_name,
                        namaPesanan: dataInq.service_name,
                        nominalPesanan: dataInq.cost,
                        sign: token,
                        totalBayar: dataInq.cost + gapPrice,
                        tr_id: res.data.data.order_id,
                        originalPrice: dataInq.cost - gapPrice,
                        status: "Diproses",
                        priorityUser: dataAkun.priority,
                        tglTransaksi: datenow,
                        type: "otp"
                      }
                      if(resp.status == true) {
                        try {
                
                            Fire.database()
                            .ref('order/' + token + '/')
                            .set(dataKirimanFB)
                            .then((resDB) => {
                                setLoading(false)
                
                                const penguranganSaldo = dataAkun.saldo - dataKirimanFB.totalBayar
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
                    setLoading(false)
                    alert(e)
                } 


            } else if(params == "Streaming") {
                try {
        setVisibleCheckStream(false)

                
                setLoading(true)
        
                      const datenow = moment().format("HH-MM-YYYY HH:mm:ss")
                      const dataKirimanFB = {
                        uidPemesan: dataAkun.uid,
                        namaPemesan: dataAkun.nama,
                        uidPesanan: token,
                        codePesaan: dataInq.kode_produk,
                        namaPesanan: dataInq.nama_produk,
                        nominalPesanan: dataInq.cost,
                        sign: token,
                        totalBayar: dataInq.cost + gapPrice,
                        tr_id: token,
                        originalPrice: dataInq.cost - gapPrice,
                        status: "Diproses",
                        priorityUser: dataAkun.priority,
                        tglTransaksi: datenow,
                        type: "streaming"
                      }
                     
                        try {
                
                            Fire.database()
                            .ref('order/' + token + '/')
                            .set(dataKirimanFB)
                            .then((resDB) => {
                                setLoading(false)
                
                                const penguranganSaldo = dataAkun.saldo - dataKirimanFB.totalBayar
                                Fire.database()
                                    .ref('users/' + dataAkun.username + '/')
                                    .update({
                                    saldo: penguranganSaldo
                                    })
                                    axios.post('https://api.fonnte.com/send', {
                                        target: '085794196626',
                                        message: "*[BELI STREAMING]* \n \n Ada yang beli streaming dengan data uid pesanan " + token + " dengan pesanan " + dataKirimanFB.namaPesanan + dataKirimanFB.nominalPesanan + " total Bayar pengguna " + dataKirimanFB.totalBayar   + "segera proses!"
                                      }, {
                                        headers: {
                                          Authorization: 'F1b9L7Rn9dq@@9okuqmK'
                                        }
                                      })
                                console.log('RES', resDB);
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
                            
                
                
                   
                    
                    
            
                } catch (e) {
                    setLoading(false)
                    alert(e)
                } 
            } 
          
        } else {
           
                setLoading(false)
                alert('Saldo tidak cukup. Silahkan isi ulang terlebih dahulu sebelum melanjutkan. ')
            
          
           }
      }


      const getInquiry = async (item) => {
        console.log('INQ', item);

        if(params == "OTP") {
            if(item.count == 0) {
                alert('Mohon maaf, Stok sedang kosong..')
            } else {
                setDataInq(item)
                setVisibleCheck(true)
            }
        } else if(params == "Streaming") {
            setDataInq(item)
            setVisibleCheckStream(true)
        } else {
            if(inputan.link !== "") {
                setDataInq(item)
                setVisibleCheckSocmed(true)
            } else {
                alert('Username / Link tidak boleh kosong!')
            }
           
        }
          
                 
         
      }


      const handleDrop = () => {
        if(dataAkun.priority == "yes") {
            setGapPrice(300)
          } else {
            setGapPrice(500)

          }
        if(params == "OTP") {
                setDataDrop(dataNokos)
        } else if(params == "Streaming") {
            setDataDrop(dataStream)
        } else {
            setDataDrop(dataSocmed)
        }
      }
   

      const getRiyen = async () => {

        try {
            await axios.get('https://otpweb.net/api?api_key=01e5847ed4eb05cf0b7983af915258cb31c74f85&action=get_service&country_id=6').then((res) => {
            console.log('respomn',res.data.data);
            setAllPulsa(res.data.data)
           })
        } catch (e) {
            console.log('er', e.response.data);
        }
           
    }
    
    const getStream = async () => {
        try {
          setLoading(true)
          Fire.database()
          .ref('streaming/')
          .once('value')
          .then((resDB) => {
              const datled = []
              console.log('hasilleads', datled)
              const value = resDB.val()
              if (value) {
                  Object.keys(value).map((item) => {
                      datled.push(value[item]);
                 
                  });
                 
                  console.log('hasilSTREAM', datled);
        setLoading(false)
        setDataStreaming(datled)
                  // setAllDataLeads(allFilterData)
                
                }
          }
          )
        } catch (e) {
      setLoading(false)
      alert('Terdapat kesalahan')
        }
      
      }

      const getNusantara = async () => {

        try {
            await axios.post(`${APIUrlRiyen}/api/services`, {
                api_id: APIIDRIYEN,
                api_key: APIKEYRIYEN
            }).then((res) => {
            console.log('respomn',res.data.services);
           setDataSocmed(res.data.services)
           })
        } catch (e) {
            console.log('er', e.response.data);
        }
           
    }
      useEffect(() => {
        getRiyen()
        handleDrop()
        getStream()
        getNusantara()
      }, [])
      
  return (
    <>
    
    
    <View style={{backgroundColor: 'white', flex: 1}}>
        <HeaderSecondary title={"Beli " + params}  onPress={() => navigation.goBack()} />


    <ScrollView>
   <View style={{marginTop: 10, marginLeft: 16, marginBottom: 300}}>
   {params == "OTP" &&
    <View style={{width: '90%', paddingBottom: 20, backgroundColor: '#78C5FF', borderRadius: 5}}>
 
    <Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 20, marginLeft: 10, textAlign: 'justify', paddingHorizontal: 10}}>{"Ini adalah layanan penyedia nomor virtual untuk aplikasi-aplikasi yang dipilih. Setelah anda melakukan order, nanti nomor akan tersedia di Detail order. Dan anda silahkan masukkan untuk proses pendaftaran aplikasi. Perlu diingat, nomor hanya akan terbit 1x dan tidak bisa repeat. Silahkan gunakan secara bijak dan dilarang dipergunakan untuk tindakan yang melanggar hukum!"} </Text>
    </View>
    
    }

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
            placeholder={!isFocus ? 'Pilih Aplikasi' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
            

          />

{params == "socmed" && value !== null &&
 <TextInput
 mode='outlined'
 label="Masukan Username / Link Post"
         // eslint-disable-next-line react-native/no-inline-styles
         style={{
         
           borderRadius: 12,
           marginBottom: 8,
           marginTop: 10,
           width: '90%',
           color: 'black'
         }}
         placeholderTextColor="grey" 
         placeholder="Masukan Username / Link Post"
         
     //    defaultValue={data.name}

         onChangeText={(e) => setInput({ ...inputan, link: e })}  
       />
}

{params == "socmed" &&
    <View style={{width: '90%', paddingBottom: 20, backgroundColor: '#78C5FF', borderRadius: 5, alignSelf: 'center', marginTop: 20, marginRight: 30}}>
 
    <Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 20, marginLeft: 10, textAlign: 'center', paddingHorizontal: 10}}>{"Jika anda memesan Followers maka inputkan username saja (contoh: yginsta_) jika anda memesan like maka tempelkan link (Ambil dari share dan copy link di Platform)"} </Text>
    </View>
    
    }

{/* OTP */}
          {params == "OTP" &&
          
          allPulsa.filter((e) => e.service_name == value).map((i, index) => {
    return (
        <View>


<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 20, marginLeft: 10}}>{"Klik untuk melanjutkan"} </Text>
<TouchableOpacity style={styles.box} onPress={() =>  getInquiry(i)}>
    <View style={{marginTop: 5}}>

<Text style={{color: '#000080', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{i.service_name + " OTP"} </Text>
<View style={{flexDirection: 'row'}}>
<Text style={{color: '#000080', fontSize: 20, fontWeight: 'bold', marginLeft: 10, fontFamily: 'Poppins-Bold', marginTop: 10,}}>{formatRupiah(i.cost + gapPrice)} </Text>

</View>
    </View>


  
</TouchableOpacity>
        </View>
    )
}) 
}

{/* Stream */}
{params == "Streaming" && dataStreaming.filter((e) => e.type == value).map((i, index) => {
    return (
        <View>


<TouchableOpacity style={styles.box} onPress={() =>  getInquiry(i)}>
    <View style={{marginTop: 5}}>

<Text style={{color: '#000080', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{i.nama_produk} </Text>
<View style={{flexDirection: 'row'}}>
<Text style={{color: '#000080', fontSize: 20, fontWeight: 'bold', marginLeft: 10, fontFamily: 'Poppins-Bold', marginTop: 10,}}>{formatRupiah(i.cost + gapPrice)} </Text>

</View>
    </View>


  
</TouchableOpacity>
        </View>
    )
}) 
}

{/* Socmed */}
{params == "socmed" && dataSocmeds.filter((e) => e.name.includes(value)).map((i, index) => {
    return (
        <View>


<TouchableOpacity style={styles.box} onPress={() =>  getInquiry(i)}>
    <View style={{marginTop: 5}}>

<Text style={{color: '#000080', fontSize: 16, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{i.name} </Text>
<View style={{flexDirection: 'row'}}>
<Text style={{color: '#000080', fontSize: 20, fontWeight: 'bold', marginLeft: 10, fontFamily: 'Poppins-Bold', marginTop: 10,}}>{formatRupiah(i.price + gapPrice) + "/k"}  </Text>

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
    </View>

    <Modal visible={visibleCheck} onDismiss={() => setVisibleCheck(false)}>
    <View style={{backgroundColor: 'white', width: 300, height: 300, alignSelf: 'center'}}>
    <Text style={{color: '#000080', fontSize: 20, fontWeight: 'bold', marginLeft: 10, fontFamily: 'Poppins-Bold', marginTop: 10,}}>Detail Pemesanan </Text>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Nama Pesanan OTP"} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10, marginRight: 10}}>{dataInq.service_name ? dataInq.service_name + " OTP" : "xxx"} </Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Harga"} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10, marginRight: 10}}>{dataInq.cost ? formatRupiah(dataInq.cost + gapPrice) : 0} </Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Stok"} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10, marginRight: 10}}>{dataInq.count ? dataInq.count : 0} </Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Total Bayar"} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10, marginRight: 10}}>{dataInq.cost ? formatRupiah(dataInq.cost + gapPrice) : 0} </Text>
    </View>
    <TouchableOpacity style={{backgroundColor: '#78C5FF', width: '80%', alignSelf: 'center', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 50}} 
          onPress={handleBayar}
          >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Bayar dengan Saldo</Text>
    </TouchableOpacity>
    </View>
</Modal>


<Modal visible={visibleCheckStream} onDismiss={() => setVisibleCheckStream(false)}>
    <View style={{backgroundColor: 'white', width: 400, height: 400, alignSelf: 'center'}}>
    <Text style={{color: '#000080', fontSize: 20, fontWeight: 'bold', marginLeft: 10, fontFamily: 'Poppins-Bold', marginTop: 10,}}>Detail Pemesanan </Text>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Nama Pesanan"} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10, marginRight: 10}}>{dataInq.nama_produk ? dataInq.nama_produk : "xxx"} </Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Harga"} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10, marginRight: 10}}>{dataInq.cost ? formatRupiah(dataInq.cost + gapPrice) : 0} </Text>
    </View>
  
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Total Bayar"} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10, marginRight: 10}}>{dataInq.cost ? formatRupiah(dataInq.cost + gapPrice) : 0} </Text>
    </View>
    <TouchableOpacity style={{backgroundColor: '#78C5FF', width: '80%', alignSelf: 'center', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 50}} 
          onPress={handleBayar}
          >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Bayar dengan Saldo</Text>
    </TouchableOpacity>
    </View>
</Modal>

<Modal visible={visibleCheckSocmed} onDismiss={() => setVisibleCheckSocmed(false)}>
    <View style={{backgroundColor: 'white', width: 300, height: 420, alignSelf: 'center'}}>
    <Text style={{color: '#000080', fontSize: 20, fontWeight: 'bold', marginLeft: 10, fontFamily: 'Poppins-Bold', marginTop: 10,}}>Detail Pemesanan </Text>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Nama Pesanan"} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10, marginRight: 10}}>{dataInq.name ? dataInq.name.slice(0,20)+ "...." : "xxx"} </Text>
    </View>

    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Username / Link"} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10, marginRight: 10}}>{inputan.link !== "" ? inputan.link : 0} </Text>
    </View>


    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Harga"} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10, marginRight: 10}}>{dataInq.price ? formatRupiah(dataInq.price + gapPrice) + "/k" : 0} </Text>
    </View>

 


  
    {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
<Text style={{color: '#000080', fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10}}>{"Total Bayar"} </Text>
<Text style={{color: '#000080', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginTop: 5, marginLeft: 10, marginRight: 10}}>{inputOrder.qty ? formatRupiah((inputOrder.qty * dataInq.cost + gapPrice) / 1000) : 0} </Text>
    </View> */}
    <TouchableOpacity style={{backgroundColor: '#78C5FF', width: '80%', alignSelf: 'center', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 50}} 
          onPress={handleSocmed}
          >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Bayar dengan Saldo</Text>
    </TouchableOpacity>
    </View>
</Modal>


    </>
  )
}

export default BuyOtp

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