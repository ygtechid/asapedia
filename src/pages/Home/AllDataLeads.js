import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CardView from '../../component/CardView';
import HeaderSecondary from '../../component/Header/HeaderSecondary';
import { FAB } from 'react-native-paper';
import Fire  from '../../config/Fire';
import DatePicker from 'react-native-date-picker';



const AllDataLeads = ({navigation, route}) => {

   
    const [allDataLeads, setAllDataLeads] = useState([])
    const [findSelf, setFindself] = useState({})
    const [uid, setUID] = useState("")
    const [namaHeaders, setNamaHeaders] = useState("All")
    const [inputan, setInput] = useState({
        nama: "",
        tags: ""
      })

    const gettoken = async () => {
       const getToken =  await AsyncStorage.getItem('@token')
       const getFindself =  await AsyncStorage.getItem('@findSelf')
       const getUID =  await AsyncStorage.getItem('@userid')
        const parseFindself = JSON.parse(getFindself)
        setFindself(parseFindself)
        setUID(getUID)
        console.log('getstor', getUID);
    }
    
    const [date, setDate] = useState(new Date())
    const [dateConfirm, setDateConfirm] = useState("")

    const [open, setOpen] = useState(false)
    console.log('tanggal', dateConfirm);
    const handleConfirm = (currentDate) => {
        const tgl = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
        const bln = currentDate.getMonth() + 1 < 10 ? "0" + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
        var jdw = currentDate.getFullYear() + "/" + bln + "/" + tgl;
        console.log(jdw);
      
        setDateConfirm(jdw);
       
      };
  




const getLeads = async () => {
 
    Fire.database()
    .ref('leads/')
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
            setAllDataLeads(allFilterData)
          
          }
    }
    )
}

const handleWA = (item) => {
    console.log('openWA', item.whatsapp);
    const OpenWA = 'http://wa.me/62' + item.whatsapp
     Linking.openURL(OpenWA).then((res) => {
        console.log('openWA', OpenWA);
     })
}

const handleTel = (item) => {
    const OpenTel = 'tel:' + item.phone
     Linking.openURL(OpenTel).then((res) => {
        console.log('opentel', OpenTel);
     })
}

handleClear = () => {
    setInput({
        nama : "",
        tags: ""
    })
    setDateConfirm("")
}
useEffect(() => {
    gettoken()
    getLeads()
}, [])


  return (
    <>
    
    <View style={{flex: 1, backgroundColor: 'white'}}>
     <HeaderSecondary title={findSelf.nama}  />
     <ScrollView>
     <View>
     {namaHeaders == "All" &&
     <>
     
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 16}}>

   
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: '#78C5FF', borderWidth: 1, borderColor: '#78C5FF'}}>
    <Text style={{color: 'white', fontWeight: 'bold', textAlign:'center'}}>All</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, borderColor: '#78C5FF'}}
        onPress={() => setNamaHeaders('Awareness')}
        >
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Awareness</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', 
    borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('Discovery')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Discovery</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', 
    borderWidth: 1, borderColor: '#78C5FF',}}
    onPress={() => setNamaHeaders('Evaluation')}>
    
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Evaluation</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', 
    borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('Intent')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Intent</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, 
    borderColor: '#78C5FF',
    marginRight: 20}}
    onPress={() => setNamaHeaders('Purchase')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Purchase</Text>
    </TouchableOpacity>
    </ScrollView>
    <View style={{flexDirection: 'row'}}>
    <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
              width: '30%',
                marginLeft: 16,
                color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Cari Nama"
            onChangeText={(e) => setInput({ ...inputan, nama: e })}  
          />
          <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
                marginLeft: 5,
              width: '30%',
              color: 'black'
            
            }}
            placeholderTextColor="grey" 
            placeholder="Cari Tags"
            onChangeText={(e) => setInput({ ...inputan, tags: e })}  
          />
   
    <TouchableOpacity style={{width: 70, height: 40, 
        backgroundColor: '#78C5FF', marginTop: 5, marginLeft: 5,
        borderRadius: 5}}
        onPress={() => setOpen(true)}>
            <Text style={{textAlign: 'center', color: 'white', }} >Cari Tanggal</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 40, height: 40, 
        backgroundColor: 'red', marginTop: 5, marginLeft: 5,
        borderRadius: 5}}
        onPress={handleClear}>
            <Text style={{textAlign: 'center', color: 'white', marginTop: 5}} >Clear</Text>
    </TouchableOpacity>
    </View>
   
    {(allDataLeads) && (inputan.nama == "") && (dateConfirm == "") && (inputan.tags == "") ?
allDataLeads.filter((e) => e.idSales == uid).map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})
:
dateConfirm !== "" ?
allDataLeads.filter((e) => e.idSales == uid && e.date == dateConfirm).map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})
:
allDataLeads.filter((e) => e.idSales == uid && e.name == inputan.nama || e.tags == inputan.tags).map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})

}
     </> 
}

{namaHeaders == "Awareness" &&
     <>
     
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 16}}>

   
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('All')}
    >
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>All</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: '#78C5FF', borderWidth: 1, borderColor: '#78C5FF'}}>
    <Text style={{color: 'white', fontWeight: 'bold', textAlign:'center'}}>Awareness</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('Discovery')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Discovery</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', 
    borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('Evaluation')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Evaluation</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', 
    borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('Intent')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Intent</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, 
    borderColor: '#78C5FF',
    marginRight: 20}}
    onPress={() => setNamaHeaders('Purchase')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Purchase</Text>
    </TouchableOpacity>
    </ScrollView>

    <View style={{flexDirection: 'row'}}>
    <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
              width: '30%',
                marginLeft: 16,
                color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Cari Nama"
            onChangeText={(e) => setInput({ ...inputan, nama: e })}  
          />
          <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
                marginLeft: 5,
              width: '30%',
              color: 'black'
            
            }}
            placeholderTextColor="grey" 
            placeholder="Cari Tags"
            onChangeText={(e) => setInput({ ...inputan, tags: e })}  
          />
   
    <TouchableOpacity style={{width: 70, height: 40, 
        backgroundColor: '#78C5FF', marginTop: 5, marginLeft: 5,
        borderRadius: 5}}
        onPress={() => setOpen(true)}>
            <Text style={{textAlign: 'center', color: 'white', }} >Cari Tanggal</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 40, height: 40, 
        backgroundColor: 'red', marginTop: 5, marginLeft: 5,
        borderRadius: 5}}
        onPress={handleClear}>
            <Text style={{textAlign: 'center', color: 'white', marginTop: 5}} >Clear</Text>
    </TouchableOpacity>
    </View>
   
    {(allDataLeads) && (inputan.nama == "") && (dateConfirm == "") && (inputan.tags == "") ?
allDataLeads.filter((e) => e.idSales == uid && e.pipeline == 'Awareness').map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})
:
dateConfirm !== "" ?
allDataLeads.filter((e) => e.idSales == uid && e.date == dateConfirm && e.pipeline == 'Awareness').map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})
:
allDataLeads.filter((e) => e.idSales == uid &&  e.pipeline == 'Awareness' && e.name == inputan.nama || e.tags == inputan.tags).map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})

}
     </> 
}

{namaHeaders == "Discovery" &&
     <>
     
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 16}}>

   
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('All')}
    >
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>All</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('Awareness')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Awareness</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: '#78C5FF', borderWidth: 1, borderColor: '#78C5FF'}}>
    <Text style={{color: 'white', fontWeight: 'bold', textAlign:'center'}}>Discovery</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.touchableSt}
     onPress={() => setNamaHeaders('Evaluation')}
    >
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Evaluation</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', 
    borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('Intent')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Intent</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, 
    borderColor: '#78C5FF',
    marginRight: 20}}
    onPress={() => setNamaHeaders('Purchase')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Purchase</Text>
    </TouchableOpacity>
    </ScrollView>
    <View style={{flexDirection: 'row'}}>
    <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
              width: '30%',
                marginLeft: 16,
                color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Cari Nama"
            onChangeText={(e) => setInput({ ...inputan, nama: e })}  
          />
          <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
                marginLeft: 5,
              width: '30%',
              color: 'black'
            
            }}
            placeholderTextColor="grey" 
            placeholder="Cari Tags"
            onChangeText={(e) => setInput({ ...inputan, tags: e })}  
          />
   
    <TouchableOpacity style={{width: 70, height: 40, 
        backgroundColor: '#78C5FF', marginTop: 5, marginLeft: 5,
        borderRadius: 5}}
        onPress={() => setOpen(true)}>
            <Text style={{textAlign: 'center', color: 'white', }} >Cari Tanggal</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 40, height: 40, 
        backgroundColor: 'red', marginTop: 5, marginLeft: 5,
        borderRadius: 5}}
        onPress={handleClear}>
            <Text style={{textAlign: 'center', color: 'white', marginTop: 5}} >Clear</Text>
    </TouchableOpacity>
    </View>
   
    {(allDataLeads) && (inputan.nama == "") && (dateConfirm == "") && (inputan.tags == "") ?
allDataLeads.filter((e) => e.idSales == uid && e.pipeline == 'Discovery').map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})
:
dateConfirm !== "" ?
allDataLeads.filter((e) => e.idSales == uid && e.date == dateConfirm && e.pipeline == 'Discovery').map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})
:
allDataLeads.filter((e) => e.idSales == uid &&  e.pipeline == 'Discovery' && e.name == inputan.nama || e.tags == inputan.tags).map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})

}
     </> 
}

{namaHeaders == "Evaluation" &&
     <>
     
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 16}}>

   
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('All')}
    >
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>All</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('Awareness')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Awareness</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, borderColor: '#78C5FF'}}
     onPress={() => setNamaHeaders('Discovery')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Discovery</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: '#78C5FF', borderWidth: 1, borderColor: '#78C5FF'}}>
    <Text style={{color: 'white', fontWeight: 'bold', textAlign:'center'}}>Evaluation</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', 
    borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('Intent')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Intent</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, 
    borderColor: '#78C5FF',
    marginRight: 20}}
    onPress={() => setNamaHeaders('Purchase')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Purchase</Text>
    </TouchableOpacity>
    </ScrollView>
    <View style={{flexDirection: 'row'}}>
    <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
              width: '30%',
                marginLeft: 16,
                color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Cari Nama"
            onChangeText={(e) => setInput({ ...inputan, nama: e })}  
          />
          <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
                marginLeft: 5,
              width: '30%',
              color: 'black'
            
            }}
            placeholderTextColor="grey" 
            placeholder="Cari Tags"
            onChangeText={(e) => setInput({ ...inputan, tags: e })}  
          />
   
    <TouchableOpacity style={{width: 70, height: 40, 
        backgroundColor: '#78C5FF', marginTop: 5, marginLeft: 5,
        borderRadius: 5}}
        onPress={() => setOpen(true)}>
            <Text style={{textAlign: 'center', color: 'white', }} >Cari Tanggal</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 40, height: 40, 
        backgroundColor: 'red', marginTop: 5, marginLeft: 5,
        borderRadius: 5}}
        onPress={handleClear}>
            <Text style={{textAlign: 'center', color: 'white', marginTop: 5}} >Clear</Text>
    </TouchableOpacity>
    </View>
   
    {(allDataLeads) && (inputan.nama == "") && (dateConfirm == "") && (inputan.tags == "") ?
allDataLeads.filter((e) => e.idSales == uid && e.pipeline == 'Evaluation').map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})
:
dateConfirm !== "" ?
allDataLeads.filter((e) => e.idSales == uid && e.date == dateConfirm && e.pipeline == 'Evaluation').map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})
:
allDataLeads.filter((e) => e.idSales == uid &&  e.pipeline == 'Evaluation' && e.name == inputan.nama || e.tags == inputan.tags).map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})

}
         </> 
}

{namaHeaders == "Intent" &&
     <>
     
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 16}}>

   
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('All')}
    >
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>All</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('Awareness')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Awareness</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, borderColor: '#78C5FF'}}
     onPress={() => setNamaHeaders('Discovery')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Discovery</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', 
    borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('Evaluation')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Evaluation</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: '#78C5FF', borderWidth: 1, borderColor: '#78C5FF'}}>
    <Text style={{color: 'white', fontWeight: 'bold', textAlign:'center'}}>Intent</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, 
    borderColor: '#78C5FF',
    marginRight: 20}}
    onPress={() => setNamaHeaders('Purchase')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}
    >Purchase</Text>
    </TouchableOpacity>
    </ScrollView>
    <View style={{flexDirection: 'row'}}>
    <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
              width: '30%',
                marginLeft: 16,
                color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Cari Nama"
            onChangeText={(e) => setInput({ ...inputan, nama: e })}  
          />
          <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
                marginLeft: 5,
              width: '30%',
              color: 'black'
            
            }}
            placeholderTextColor="grey" 
            placeholder="Cari Tags"
            onChangeText={(e) => setInput({ ...inputan, tags: e })}  
          />
   
    <TouchableOpacity style={{width: 70, height: 40, 
        backgroundColor: '#78C5FF', marginTop: 5, marginLeft: 5,
        borderRadius: 5}}
        onPress={() => setOpen(true)}>
            <Text style={{textAlign: 'center', color: 'white', }} >Cari Tanggal</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 40, height: 40, 
        backgroundColor: 'red', marginTop: 5, marginLeft: 5,
        borderRadius: 5}}
        onPress={handleClear}>
            <Text style={{textAlign: 'center', color: 'white', marginTop: 5}} >Clear</Text>
    </TouchableOpacity>
    </View>
   
    {(allDataLeads) && (inputan.nama == "") && (dateConfirm == "") && (inputan.tags == "") ?
allDataLeads.filter((e) => e.idSales == uid && e.pipeline == 'Intent').map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})
:
dateConfirm !== "" ?
allDataLeads.filter((e) => e.idSales == uid && e.date == dateConfirm && e.pipeline == 'Intent').map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})
:
allDataLeads.filter((e) => e.idSales == uid &&  e.pipeline == 'Intent' && e.name == inputan.nama || e.tags == inputan.tags).map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})

}
     </> 
}


{namaHeaders == "Purchase" &&
     <>
     
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 16}}>

   
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('All')}
    >
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>All</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('Awareness')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Awareness</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, borderColor: '#78C5FF'}}
     onPress={() => setNamaHeaders('Discovery')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Discovery</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white', 
    borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('Evaluation')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Evaluation</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: 'white',
    borderWidth: 1, borderColor: '#78C5FF'}}
    onPress={() => setNamaHeaders('Intent')}>
    <Text style={{color: '#78C5FF', fontWeight: 'bold', textAlign:'center'}}>Intent</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: '#78C5FF', borderWidth: 1, 
    borderColor: '#78C5FF',
    marginRight: 20}}
    onPress={() => setNamaHeaders('Purchase')}>
    <Text style={{color: 'white', fontWeight: 'bold', textAlign:'center'}}
    >Purchase</Text>
    </TouchableOpacity>
    </ScrollView>
    <View style={{flexDirection: 'row'}}>
    <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
              width: '30%',
                marginLeft: 16,
                color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Cari Nama"
            onChangeText={(e) => setInput({ ...inputan, nama: e })}  
          />
          <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#F0F7FF',
              borderRadius: 12,
              marginBottom: 10,
                marginLeft: 5,
              width: '30%',
              color: 'black'
            }}
            placeholderTextColor="grey" 
            placeholder="Cari Tags"
            onChangeText={(e) => setInput({ ...inputan, tags: e })}  
          />
   
    <TouchableOpacity style={{width: 70, height: 40, 
        backgroundColor: '#78C5FF', marginTop: 5, marginLeft: 5,
        borderRadius: 5}}
        onPress={() => setOpen(true)}>
            <Text style={{textAlign: 'center', color: 'white', }} >Cari Tanggal</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{width: 40, height: 40, 
        backgroundColor: 'red', marginTop: 5, marginLeft: 5,
        borderRadius: 5}}
        onPress={handleClear}>
            <Text style={{textAlign: 'center', color: 'white', marginTop: 5}} >Clear</Text>
    </TouchableOpacity>
    </View>
   
    {(allDataLeads) && (inputan.nama == "") && (dateConfirm == "") && (inputan.tags == "") ?
allDataLeads.filter((e) => e.idSales == uid && e.pipeline == 'Purchase').map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})
:
dateConfirm !== "" ?
allDataLeads.filter((e) => e.idSales == uid && e.date == dateConfirm && e.pipeline == 'Purchase').map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})
:
allDataLeads.filter((e) => e.idSales == uid &&  e.pipeline == 'Purchase' && e.name == inputan.nama || e.tags == inputan.tags).map((item, index) => {
    return (
<CardView 
data={item} 
onPress={() => navigation.push('ViewLeads', {
    data: item,
    uid: uid
})}
onPressWA={() => handleWA(item)}
onPressTel={() => handleTel(item)}

/>
    )

})

}
     </> 
}


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

export default AllDataLeads

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        color: '#D8EDFD'
      },
      touchableSt: {width: 100, height: 30, backgroundColor: 'white', borderWidth: 1, borderColor: '#78C5FF'}
})