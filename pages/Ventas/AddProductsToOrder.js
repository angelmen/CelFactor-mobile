import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import NavHeader from '../../components/navHeader';

export default function Builder({ route }) {
  const navigation = useNavigation();
  if (useIsFocused()) {
    return <AddProduct params={route.params} navigation={navigation} />;
  } else {
    return <View />;
  }
}

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.params?.item,
      quantity: 1,
      discount: 0,
      details: '',
    };
    this.order = this.props.params?.order
  }

  componentDidMount() {
    this.clear();
  }

  clear() {
    this.setState({
      quantity: 1,
      discount: 0,
      details: '',
    });
  }

  render() {
    return (
      <SafeAreaView>
        <NavHeader name="Agregar a la orden" icon="back" />
        <View>
          <View style={{ alignSelf: 'center', paddingVertical: 50 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {this.state.item.description}
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
              RD${this.state.item.unit_price}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 30 }}>
            <TextInput
              style={{
                padding: 20,
                borderWidth: 2,
                borderRadius: 10,
                marginBottom: 10,
              }}
              keyboardType="numeric"
              placeholder={'Cantidad (1)'}
              onChangeText={(value) => {
                this.setState({ quantity: value * 1 });
              }}
            />
            <TextInput
              style={{
                padding: 20,
                borderWidth: 2,
                borderRadius: 10,
                marginBottom: 10,
              }}
              keyboardType="numeric"
              placeholder={'Descuento (0)'}
              onChangeText={(value) => {
                this.setState({ discount: value * 1 });
              }}
            />
            <TextInput
              style={{
                padding: 20,
                borderWidth: 2,
                borderRadius: 10,
                marginBottom: 10,
              }}
              placeholder={'Detalles'}
              multiline
              onChangeText={(value) => {
                this.setState({ details: value.toUpperCase() });
              }}
            />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: '#777',
                textAlign: 'center',
              }}>
              TOTAL: RD$
              {this.state.item.unit_price * this.state.quantity -
                this.state.discount}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 30,
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{ backgroundColor: 'red', padding: 15, borderRadius: 10 }}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Text style={{ color: '#FFF' }}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'blue',
                padding: 15,
                borderRadius: 10,
              }}
              onPress={() => {
                var newOrderData = this.order;
                newOrderData.push({
                    item: this.state.item,
                    quantity: this.state.quantity,
                    discount: this.state.discount,
                    details: this.state.details,
                    total: (this.state.item.unit_price * this.state.quantity -
                this.state.discount)
                  });

                this.props.navigation.navigate('Ventas', {
                  order: newOrderData
                });
              }}>
              <Text style={{ color: '#FFF' }}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
