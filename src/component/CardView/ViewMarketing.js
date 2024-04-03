import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ViewMarketing = () => {
  return (
    <View style={{backgroundColor: 'white', marginTop: 20, height: 800, width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20}}>
          <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', marginTop: 16}}>MENU UTAMA</Text>
          <View style={{marginTop: 34,  alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity onPress={handleAdd}>
          <Image source={ICAdd} style={{width: 55, height: 53,}} />
          <Text style={{color: 'black', fontSize: 12, fontWeight: '400', marginTop: 16, marginLeft: -16}}>Add Pelanggan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push('DailyReport', {
              data: findSelf
          })}>
          <Image source={ICLap}  style={{width: 55, height: 53,}} />
          <Text style={{color: 'black', fontSize: 12, fontWeight: '400', marginTop: 16, marginLeft: -16}}>Laporan Harian</Text>
          </TouchableOpacity>
          
          
          </View>
          {/* <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', marginTop: 40}}>DATA PELANGGAN TERBARU</Text>
          <Text style={{color: 'black', fontSize: 12,  marginTop: 10, fontWeight: '300'}}>{"Cabang " + findSelf.cabang + " - Team " + findSelf.team} </Text>
          {allDataCustomer.length == 0 && <Text style={{textAlign: 'center', marginTop: 20,}}> Data Belum Ada</Text> }
          <View style={{marginTop: 16, height: 500}}>
              {allDataCustomer ? 
              
              allDataCustomer.filter((e) => e.team == findSelf.team && e.cabang == findSelf.cabang).map((i, index) => {
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
              }) : null    }
          
          
          </View> */}
          
          
          {/* <TouchableOpacity style={{backgroundColor: '#78C5FF', alignSelf: 'center', width: '70%', height: 40,  marginBottom: 14, borderRadius: 8, marginTop: 30}} 
           onPress={handleLogout}
            >
          <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Logout</Text>
          </TouchableOpacity> */}
          </View>
  )
}

export default ViewMarketing

const styles = StyleSheet.create({})