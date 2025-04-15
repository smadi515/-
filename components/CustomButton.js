import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomButton = ({text, onPress, type = 'PRIMARY'}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  container_PRIMARY: {
    fontWeight: 'bold',
    borderRadius: 40,
    width: '30%',
    backgroundColor: '#00BCD4',
    container_tERTIARY: {},
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  text_PRIMARY: {
    color: 'black',
  },
  text_TERTIARY: {
    color: 'gray',
    textDecorationLine: 'underline',
  },
});
export default CustomButton;
