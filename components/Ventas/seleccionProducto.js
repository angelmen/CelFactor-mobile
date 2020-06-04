import React, { Component, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  ScrollView,
  TextInput,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { SearchBar, ListItem } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';

var count = 0;

function AddToOrders({ item }) {
  return (
    <View style={{ alignSelf: 'center', zIndex: 100, elevation: 100 }}>
      <Text>Agregar a la orden</Text>
      <TextInput value={item.description} editable={false} />
      <TextInput value={item.unit_price} />
      <TextInput placeholder={'Detalles '} />
      <TextInput placeholder={'Cantidad '} />
    </View>
  );
}

function AddProducts() {
  const navigation = useNavigation();
  navigation.navigate('AddProductsToOrder');
}

export default function Screen({ route, navigation }) {
  const isFocused = useIsFocused();
  if (isFocused) {
    return <SeleccionProducto navigation={navigation}/>;
  } else {
    return <View />;
  }
}

export class SeleccionProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverData: [],
      arrayholder: [],
      search: '',
      isLoading: false,
      text: '',
      editing: false,
      refreshing: false,
      error: false,
      showItems: true,
      orden: [],
    };
    this.orden = [];
    this.navigation = this.props.navigation;
  }

  render() {
    return this.state.isLoading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    ) : (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              backgroundColor: 'red',
              marginHorizontal: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              this.setState({ orden: [] });
            }}>
            <Text style={{ color: '#fff' }}>Eliminar orden</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 30,
              backgroundColor: 'blue',
              marginHorizontal: 10,
              borderRadius: 10,
            }}
            onPress={()=>{alert(this.navigation)}}>
            <Text style={{ color: '#fff' }}>Agregar productos</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 6 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              paddingVertical: 20,
              paddingHorizontal: 10,
            }}>
            Esta venta
          </Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nombre</DataTable.Title>
              <DataTable.Title numeric>Cantidad</DataTable.Title>
              <DataTable.Title numeric>Precio</DataTable.Title>
            </DataTable.Header>
            <ScrollView style={{ maxHeight: 250 }}>
              {this.state.orden.map(item => {
                return <Product item={item} modal={'orden'} />;
              })}
            </ScrollView>
          </DataTable>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: 'red',
              marginHorizontal: 10,
              borderRadius: 10,
            }}>
            <Text style={{ color: '#fff' }}>cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: 'green',
              marginHorizontal: 10,
              borderRadius: 10,
            }}>
            <Text style={{ color: '#fff' }}>Cobrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function Product({ item, modal }) {
  if (modal == 'orden') {
    return (
      <DataTable.Row>
        <DataTable.Cell>
          <Text style={{ fontSize: 10 }}>{item.description}</Text>
        </DataTable.Cell>
        <DataTable.Cell numeric>{item.stock}</DataTable.Cell>
        <DataTable.Cell numeric>{item.unit_price}</DataTable.Cell>
      </DataTable.Row>
    );
  } else {
    return (
      <TouchableOpacity style={styles.product}>
        <Text style={styles.productDesc}>{item.description}</Text>
        <Text style={styles.productDetail}>{'Cantidad: ' + item.stock}</Text>
        <Text style={styles.productDetail}>{'Costo: ' + item.cost}</Text>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  product: {
    alignSelf: 'center',
    width: '90%',
    borderWidth: 0,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 5,
    backgroundColor: '#FFF',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  productDesc: {
    color: '#6435A6',
    fontWeight: 'bold',
    fontFamily: 'centuri-gothic',
    fontSize: 16,
  },
  productDetail: {
    color: '#B885FF',
    fontSize: 12,
  },
});
