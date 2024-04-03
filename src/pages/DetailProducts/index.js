import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderWithBack from '../../component/Header/HeaderWithBack';

const DetailProducts = ({route, navigation}) => {

    const {detail} = route.params;
    console.log('dett', detail);

      return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
        <HeaderWithBack title={(detail.title).slice(0,20) + "..."} onPress={() => navigation.goBack()} />
        <View>
            <Image source={{uri: detail.image}} style={{width: '100%', height: 300}} />
            <View style={{padding: 16}}>
            <Text style={{fontSize: 14, fontWeight: '400', color: 'black'}}>{detail.title}</Text>
            <Text style={{fontSize: 14, color: 'grey'}}>$ {detail.price}</Text>
            <Text style={{fontSize: 14, fontWeight: '400', color: 'black', marginTop: 20}}>{detail.description}</Text>

            </View>
        </View>
    </View>
  )
}

export default DetailProducts

const styles = StyleSheet.create({})