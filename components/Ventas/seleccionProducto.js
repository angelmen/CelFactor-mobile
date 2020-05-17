import React from 'react'
import {View, Text, TouchableWithoutFeedback,StyleSheet} from 'react-native'

export default function SeleccionProducto(){
  return(
    <View style={styles.container}>
        <TouchableWithoutFeedback>
          <Text style={styles.barraSeleccion}>Seleccionar producto </Text>
        </TouchableWithoutFeedback>
    </View>
  )
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
    alignSelf: "center",
  },
  barraSeleccion:{
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  }
})