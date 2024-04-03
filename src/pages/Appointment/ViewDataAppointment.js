import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import HeaderSecondary from '../../component/Header/HeaderSecondary';
import Fire  from '../../config/Fire';
import DropDownPicker from 'react-native-dropdown-picker';


const ViewDataAppointment = ({navigation, route}) => {

   const {uid, data} = route.params;
   const [openStatus, setOpenStatus] = useState(false);
   const [datas, setDatas] = useState(data)
  const [valueStatus, setValueStatus] = useState(null);
    const [findSelf, setFindself] = useState({})
    
    console.log('vallstat', data.idLeads);
    const [status, setStatus] = useState([
        {label: 'Show', value: 'Show',   },
        {label: 'No Show', value: 'No Show', },
       
       

        
      ]);

    const [inputan, setInput] = useState({
        name: data.name,
        status: data.status,
        phone: data.phone,
        whatsapp: data.whatsapp,

        source: data.source,
        keterangan: data.source,


        
      })
      const [date, setDate] = useState(new Date())
      const [dateConfirm, setDateConfirm] = useState("")
      const [dateCal, setDateCal] = useState(new Date())
      const [dateConfirmCal, setDateConfirmCal] = useState("")
      const [open, setOpen] = useState(false)
      const [openCal, setOpenCal] = useState(false)

      console.log('tanggal', dateConfirm);

    const gettoken = async () => {
       const getToken =  await AsyncStorage.getItem('@token')
       const getFindself =  await AsyncStorage.getItem('@findSelf')
       const getUID =  await AsyncStorage.getItem('@userid')
        const parseFindself = JSON.parse(getFindself)
        setFindself(parseFindself)
        console.log('getstor', getUID);
    }
    
    
    const handleConfirm = (currentDate) => {
        const tgl = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
        const bln = currentDate.getMonth() + 1 < 10 ? "0" + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
        var jdw = currentDate.getFullYear() + "/" + bln + "/" + tgl;
        console.log(jdw);
      
        setDateConfirm(jdw);
       
      };

      const handleConfirmCal = (currentDate) => {
        const tgl = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
        const bln = currentDate.getMonth() + 1 < 10 ? "0" + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
        var jdw = currentDate.getFullYear() + "/" + bln + "/" + tgl;
        console.log(jdw);
      
        setDateConfirmCal(jdw);
       
      };
  
const handleAdd = async () => {

    const prefix = "ID"
    const uniquenumber = Math.floor(Math.random() * 1000000);
   const id = prefix + uniquenumber
   const getFindself =  await AsyncStorage.getItem('@findSelf')
   
    const parseFindself = JSON.parse(getFindself)
    const data = {
        idAppointment: datas.idAppointment,
       
        idSales: uid,
        namaSales: parseFindself.nama,
        name: inputan.name,
        status: valueStatus,
        date2: dateConfirm,
        phone: inputan.phone,
        whatsapp: inputan.whatsapp,
        source: inputan.source,
        keterangan1: inputan.keterangan ?  inputan.keterangan : "-",
        final: inputan.final ? inputan.final : "-"


    }

   

    Fire.database()
    .ref('appointment/' + datas.idAppointment + '/')
    .update(data)
    .then((resDB) => {
    
        navigation.replace('MyTabs')
        alert('Berhasil Update Appointment')
    })
}
useEffect(() => {
    gettoken()
   
}, [])


  return (
    <>
    
    <View style={{flex: 1, backgroundColor: 'white'}}>
     <HeaderSecondary title={findSelf.nama}  />
     <ScrollView>
     <View >
        <Text style={{color: 'black', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 20}}>View Data Appointment</Text>
       
       <View style={{padding: 16}}>
      <TouchableOpacity style={{backgroundColor: '#F0F7FF', 
      height: 30, width:200, marginBottom: 20, alignSelf: 'center'
      }}
      onPress={() => setOpen(true)}>
        {dateConfirm !== "" ?
                    <Text style={{fontSize: 14, color: 'grey', textAlign: 'center'}}>{dateConfirm}</Text>
        :
        <Text style={{fontSize: 14, color: 'grey', textAlign: 'center'}}>Pilih Tanggal Follow UP 2</Text>

    }
      </TouchableOpacity>
     
       <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 8,
              width: '80%',
              alignSelf: 'center',
              color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Customer Name"
           defaultValue={data.name}

            onChangeText={(e) => setInput({ ...inputan, name: e })}  
          />
           <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 8,
              width: '80%',
              alignSelf: 'center',
              color: 'black',
              color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Phone Number"
           defaultValue={data.phone}

            onChangeText={(e) => setInput({ ...inputan, phone: e })}  
          />
             <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
              width: '80%',
              alignSelf: 'center',
              color: 'black',
              
            }}
            placeholderTextColor="grey" 
           defaultValue={data.whatsapp}

            placeholder="No. WhatsApp (Isi tanpa 0 / 62)"
            onChangeText={(e) => setInput({ ...inputan, whatsapp: e })}  
          />
           <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
              width: '80%',
              alignSelf: 'center',
              color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Source"
           defaultValue={data.source}

            onChangeText={(e) => setInput({ ...inputan, source: e })}  
          />
           {/* <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
              width: '80%',
              alignSelf: 'center'
            }}
            placeholderTextColor="grey" 
            placeholder="Status"
            onChangeText={(e) => setInput({ ...inputan, status: e })}  
          /> */}
          <View style={{width: '80%', alignSelf: 'center'}}>
          <DropDownPicker
    placeholder="Silahkan pilih Status"
    open={openStatus}
    value={valueStatus}
    items={status}
    setOpen={setOpenStatus}
    setValue={setValueStatus}
    setItems={setStatus}
    style={{backgroundColor: '#F0F7FF', marginBottom: 10,flex: 1}}
  />
          </View>
          
          <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
              width: '80%',
              alignSelf: 'center',
              color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Final"
            onChangeText={(e) => setInput({ ...inputan, final: e })}  
          />


          <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
              width: '80%',
              alignSelf: 'center',
              color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Keterangan"
            onChangeText={(e) => setInput({ ...inputan, keterangan: e })}  
          />

<TouchableOpacity onPress={handleAdd} style={{backgroundColor: '#78C5FF', width: '70%', height: 40,  marginBottom: 14, borderRadius: 8, marginTop: 30, alignSelf: 'center'}

} 
           
              >
        <Text style={{textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}} >Simpan Data</Text>
    </TouchableOpacity>
    

       </View>


</View>
     </ScrollView>
     
    </View>
    <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          handleConfirm(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      
    </>
  )
}

export default ViewDataAppointment

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        color: '#D8EDFD'
      },
})