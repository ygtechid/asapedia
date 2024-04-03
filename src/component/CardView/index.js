import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DumShirt from '../../assets/dumshirt.jpg'
import ICtelfon from '../../assets/telfon.png'
import ICWA from '../../assets/whatsapp.png'

const CardView = ({onPress, data, onPressTel, onPressWA}) => {

  const [status, setStatus] = useState("")
  
  const handleStatus = () => {
    if(data.status == 'Prospek') {
      setStatus("Awareness")
      data.pipeline = "Awareness"
    }
    else if(data.status == 'Kualifikasi' || data.status == 'Visit' || data.status == 'Kebutuhan Terpenuhi' ) {
      setStatus("Discovery")
    }
    else if(data.status == 'Kirim Perhitungan' || data.status == 'Bandingkan Produk') {
      setStatus("Evaluation")
    }
    else if(data.status == 'BI Check' || data.status == 'Pengajuan') {
      setStatus("Intent")
    }
    else if(data.statusAppointment == "true") {
      setStatus("Appointment")
    }
    else if(data.status == 'Booking Fee') {
      setStatus("Purchase")
    }
     else {
      setStatus("NULL")
    }
  }

  useEffect(() => {
    handleStatus()
  
}, [])

  return (
    <TouchableOpacity onPress={onPress} style={{backgroundColor: 'white', width: '90%', height: 90,
     marginTop: 10, shadowColor: "#000",
     alignSelf: 'center',
     borderBottomWidth: 1,
     borderBottomColor: '#D8EDFD'
   }}>
     <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>{data.name} </Text>
        <Text style={{color: 'black', fontSize: 14, marginTop: 5}}>{data.tags ? data.tags : "No Tags"} </Text>
        <Text style={{color: 'black', fontSize: 14, marginTop: 5}}>{data.date}</Text>

      </View>

      <View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={onPressTel}>
              <Image source={ICtelfon} style={{width: 40, height: 40, marginRight: 20}} />
              </TouchableOpacity>
          <TouchableOpacity onPress={onPressWA}>
          <Image source={ICWA} style={{width: 40, height: 40}} />
          </TouchableOpacity>
               

            </View>
            {status == "Appointment" ?
             <View style={{backgroundColor: 'green', height: 30, width: 100, marginTop: 5,
             borderWidth: 3  ,
             borderColor: '#D8EDFD'
           }}>
               <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>{status}</Text>
             </View>
             :
             <View style={{backgroundColor: 'white', height: 30, width: 100, marginTop: 5,
             borderWidth: 3  ,
             borderColor: '#D8EDFD'
           }}>
               <Text style={{color: 'black', textAlign: 'center', fontWeight: 'bold'}}>{status}</Text>
             </View>
          }
           
      </View>


     </View>

        
    </TouchableOpacity >
  )
}

export default CardView

const styles = StyleSheet.create({})