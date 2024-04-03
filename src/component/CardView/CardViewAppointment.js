import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import DumShirt from '../../assets/dumshirt.jpg'
import ICtelfon from '../../assets/telfon.png'
import ICWA from '../../assets/whatsapp.png'

const CardViewAppointment = ({title, desc, price, img, onPress, data}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{backgroundColor: 'white', width: '90%', height: 110,
     marginTop: 10, shadowColor: "#000",
     alignSelf: 'center',
     borderBottomWidth: 1,
     borderBottomColor: '#D8EDFD'
   }}>
     <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>{data.name} </Text>
        <Text style={{color: 'black', fontSize: 14, marginTop: 5}}>{data.whatsapp} </Text>
        <Text style={{color: 'black', fontSize: 14, marginTop: 5}}>{data.date1}</Text>
        <Text style={{color: 'black', fontSize: 14, marginTop: 5}}>{data.date2 ? data.date2 : "-"}</Text>


      </View>

      <View>
      {data.status == "Show" ? 
       <View style={{backgroundColor: 'white', height: 30, width: 100, marginTop: 5,
  
       backgroundColor: 'green',
 
     }}>
       
         <Text style={{color: 'black', textAlign: 'center', fontWeight: 'bold', color: 'white'}}>{data.status}</Text>
       </View>
       :
       <View style={{backgroundColor: 'white', height: 30, width: 100, marginTop: 5,
  
       backgroundColor: 'red',
 
     }}>
       
         <Text style={{color: 'black', textAlign: 'center', fontWeight: 'bold', color: 'white'}}>{data.status}</Text>
       </View>
            }
           {data.status == "Show" && 
            <View style={{backgroundColor: 'white', height: 30, width: 100, marginTop: 5,
           backgroundColor: 'green',
          }}>
            
              <Text style={{color: 'black', textAlign: 'center', fontWeight: 'bold', color: 'white'}}>{data.final}</Text>
          
            </View>}
            <Text style={{color: 'black', textAlign: 'center', fontWeight: 'bold', color: 'black'}}>{data.date2 ? "Follow Up 2"  : "Follow Up 1"}</Text>

      </View>


     </View>

        
    </TouchableOpacity >
  )
}

export default CardViewAppointment

const styles = StyleSheet.create({})