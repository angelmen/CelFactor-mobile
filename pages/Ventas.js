import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//import components
import NavHeader from '../components/navHeader';
import DescModulo from '../components/descModulo'
import SeleccionProducto from '../components/Ventas/seleccionProducto'

export default class Ventas extends Component {
  render() {
    return (
      <SafeAreaView forceInset={{ top: 'always' }}>
        <View>
          <NavHeader name="Ventas" />
          <DescModulo descripcion="Módulo de Ventas" />
          <SeleccionProducto />
        </View>
      </SafeAreaView>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})