import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderSecondary from '../../component/Header/HeaderSecondary'
import IMGAx from '../../assets/fakefoto.png'
import IMGus from '../../assets/teamwork.png'
import IMGpay from '../../assets/pay.png'

import { Image } from 'react-native'
import { conversiDateTimeIDN } from '../../context/DateTimeServices'
import Fire from '../../config/Fire'


const DailyReport = ({route, navigation}) => {

    const {data, order} = route.params
    const [allDataCustomer, setAllDataCustomer] = useState([])
    const [lengthCustomer, setLengthCustomer] = useState("")
    const [lengthOrder, setLengthOrder] = useState("")
    const [totalBayar, setTotalBayar] = useState(0)



    const datez = new Date()
    const convs = conversiDateTimeIDN(datez)


    const getLeads = async () => {
 
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
                setAllDataCustomer(datled)
                console.log('hasil', datled);
                
                const filters = datled.filter((e) => e.tanggalinput == convs )
                const filterorder = datled.filter((e) => e.team == data.team && e.cabang == data.cabang && e.status == "Selesai")
                const filterbayar = datled.filter((e) => e.team == data.team && e.cabang == data.cabang && e.status == "Selesai" && e.pembayaran !== "piutang")
              
                setLengthCustomer(filters.length)
                setLengthOrder(filterorder.length)
                var total = 0

                for (let i = 0; i < filterbayar.length; i++) {
                  const element = filterbayar[i].totalharga;
                  total += element
                }
                console.log('sxx', total);
                setTotalBayar(total)

              }
        }
        )
    }


    const handleExport = () => {
        alert('Under development')
    }

    

    useEffect(() => {
      getLeads()
    }, [])
    
 

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
         <HeaderSecondary title={"Laporan Harian"}  />

        <ScrollView>
        <View>
         <View style={{marginTop: 20, flexDirection: 'row', paddingHorizontal: 16}}>
        <Image source={IMGAx} style={{width: 60, height: 60}} />
        <View style={{marginLeft: 10}}>
        <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>{"Selamat Datang, " + data.nama}</Text>
        <Text style={{color: 'black', fontSize: 12}}>{"Cabang " + data.cabang} </Text>
        <Text style={{color: 'black', fontSize: 12, fontWeight: '300'}}>{data.role} </Text>
       </View>
        </View>
       
       
        <View style={{paddingHorizontal: 16, paddingVertical: 6, marginHorizontal: 10, marginTop: 20, backgroundColor: 'white', width: '90%',  shadowColor: "#000",
      paddingHorizontal: 16,
      borderRadius: 10,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      
      elevation: 16,}}>

        <Text style={{color: 'black', fontSize: 12, fontWeight: '500', }}>Performa Hari Ini</Text>
        <Text style={{color: 'black', fontSize: 12, fontWeight: '300'}}>{convs} </Text>

        <View style={{marginTop: 10, flexDirection: 'row', }}>

        <Image source={IMGus} style={{width: 40, height: 40}} />
        {data.role == "Marketing" ? 
        <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', marginTop: 10}}>{" " + lengthCustomer + ' Customer'} </Text>
        :
        <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', marginTop: 10}}>{" " + lengthOrder + ' Pesanan Selesai'} </Text>

      }

        </View>
        
        </View>
       

       {data.role == "Driver" &&
       
       <View style={{paddingHorizontal: 16, paddingVertical: 6, marginHorizontal: 10, marginTop: 20, backgroundColor: 'white', width: '90%',  shadowColor: "#000",
      paddingHorizontal: 16,
      borderRadius: 10,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      
      elevation: 16,}}>

        <Text style={{color: 'black', fontSize: 12, fontWeight: '500', }}>Pembayaran Diterima Hari Ini</Text>
        <Text style={{color: 'black', fontSize: 12, fontWeight: '300'}}>{convs} </Text>

        <View style={{marginTop: 10, flexDirection: 'row', }}>

        <Image source={IMGpay} style={{width: 40, height: 40}} />
        {data.role == "Marketing" ? 
        <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', marginTop: 10}}>{" " + lengthCustomer + ' Customer'} </Text>
        :
        <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', marginTop: 10}}>{" Rp " + totalBayar } </Text>

      }

        </View>
        
        </View>
       }
        
        <View style={{paddingTop: 5, paddingHorizontal: 16}}>
       
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color: 'black', fontSize: 12, fontWeight: '500', marginTop: 20}}>Data Pesanan</Text>
        <Text style={{color: 'blue', fontSize: 12, fontWeight: '500', marginTop: 20,}} onPress={handleExport}>Export Data</Text>

        </View>

        {data.role == "Marketing" ?
         <View style={{marginTop: 16}}>
         {allDataCustomer.filter((e) => e.team == data.team && e.cabang == data.cabang).map((i, index) => {
             return (
     <View style={{width: '100%', marginBottom: 10, height: 50, backgroundColor: '#F2F2F2', borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between'}}>
     <Text style={{color: 'black', fontSize: 12, fontWeight: 'bold', marginTop: 14, alignItems: 'center', marginLeft: 5}}>{i.name}</Text>
     <View>
     <Text style={{color: 'black', fontSize: 10, marginTop: 10, alignItems: 'center', }}>{i.tanggalinput}</Text>
     <Text style={{color: 'black', fontSize: 10, marginTop: 5, alignItems: 'center'}}>{"Rp " + i.harga}</Text>
     </View>
     <Text 
     
     style={{color: 'black', fontSize: 12, fontWeight: 'bold', marginTop: 14, alignItems: 'center', }}>{'Marketing ' +  i.marketing}</Text>
     <TouchableOpacity
     onPress={() => navigation.push('ViewLeads', {
         data: i
     })}
      style={{backgroundColor: '#72AFF4', height: 30, width: 30, marginRight: 10, marginTop: 10}}>
     <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 10, alignItems: 'center', }}>{'>'}</Text>
     
     </TouchableOpacity>
     
     </View>
             )
         })}
     
     
     </View>
     :
     <View style={{marginTop: 16}}>
     {allDataCustomer.filter((e) => e.team == data.team && e.cabang == data.cabang).map((i, index) => {
         return (
 <View style={{width: '100%', marginBottom: 10, height: 50, backgroundColor: '#F2F2F2', borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between'}}>
 <Text style={{color: 'black', fontSize: 12, fontWeight: 'bold', marginTop: 14, alignItems: 'center', marginLeft: 5}}>{i.name}</Text>
 <View>
 <Text style={{color: 'black', fontSize: 10, marginTop: 10, alignItems: 'center', }}>{i.tanggalinput}</Text>
 <Text style={{color: 'black', fontSize: 10, marginTop: 5, alignItems: 'center'}}>{"Rp " + i.harga}</Text>
 </View>
 <Text 
 
 style={{color: 'black', fontSize: 12, fontWeight: 'bold', marginTop: 14, alignItems: 'center', }}>{'Marketing ' +  i.marketing}</Text>
 <TouchableOpacity
 onPress={() => navigation.push('ViewLeads', {
     data: i
 })}
  style={{backgroundColor: '#72AFF4', height: 30, width: 30, marginRight: 10, marginTop: 10}}>
 <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 10, alignItems: 'center', }}>{'>'}</Text>
 
 </TouchableOpacity>
 
 </View>
         )
     })}
 
 
 </View>
      }
       
        </View>
         </View>
         
        </ScrollView>
        
    </View>
  )
}

export default DailyReport

const styles = StyleSheet.create({})