import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView} from 'react-native';

//import components
import NavHeader from '../components/navHeader';
import DescModulo from '../components/descModulo'
import SeleccionProducto from '../components/Ventas/seleccionProducto'

export default class Ventas extends Component {
  render() {
    return (
      <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
        <NavHeader name={"Ventas"}/>
        <SeleccionProducto />
      </SafeAreaView>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})