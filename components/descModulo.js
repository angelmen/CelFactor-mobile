import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DescModulo({ descripcion }) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{descripcion}</Text>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: "center",
    //alignItems: "center"
  },
  texto: {
    fontFamily: 'century-gothic',
    fontSize: 30,
    color: '#000',
    margin: 50,
  },
});
