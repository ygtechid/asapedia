import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import ICSF from '../../assets/homes.svg'
import ICSR from '../../assets/homeoff.svg'
import APactive from '../../assets/settingsonn.svg'
import APnonactive from '../../assets/settings.svg'
import TRXactive from '../../assets/transactionon.svg'
import TRXnonactive from '../../assets/transactionoff.svg'

const TabItem = ({title, active, onPress, onLongPress}) => {
  const Icon = () => {
    if (title == 'Homes') {
      return active ?  <ICSF size={40} /> :  <ICSR size={40} />;
    }
    if (title == 'Transaction') {
        return active ?   <TRXactive size={40} /> :  <TRXnonactive size={40} />;
      }
      if (title == 'Setting') {
        return active ?   <APactive size={40} /> :  <APnonactive size={40} />;
      }
    return  <Icon name='area-chart' color="#1A5D98" size={20} />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
}

export default TabItem;

const styles = StyleSheet.create({
  container: {alignItems: 'center', },
  text: (active) => ({
    fontSize: 10,
    marginTop: 3,
    color: active ? '#1A5D98' : 'grey',


  
  }),
})