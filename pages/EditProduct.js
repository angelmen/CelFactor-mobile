import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'

import NavHeader from '../components/navHeader';

export default function params({ route, navigation }, goBack) {
  return <EditProduct id={route.params.data.id} data={route.params.data} navigation={navigation}/>;
}

export class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMsg: '',
      isLoading: false,
      data: {},
      emptyError: false,
    };
    this.data = this.props.data;
    this.emptyFields = {
      description: false,
      stock: false,
      min_stock: false,
      cost: false,
      unit_price: false,
    };
  }
  

  saveData() {
    const url = `https://celfactor-api.glitch.me/v2/products/?belong_to=${
      this.data.belong_to
    }&id=${this.props.id}`;
    try {
      fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.data),
      })
        .then(response => response.json())
        .then(responseJson => {
          alert(responseJson.message);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteItem() {
    const url = `https://celfactor-api.glitch.me/v2/products/?belong_to=${
      this.data.belong_to
    }&id=${this.data.id}`;
    try {
      fetch(url, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          Alert.alert("Alerta", "Producto correctamente eliminado");
          this.props.navigation.goBack()
        });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    this.data = this.props.data;
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <NavHeader icon="back" name="Editar" onGoBack='Inventario'/>
          {this.state.error ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>
                {this.state.errorMsg || 'Hubo un problema al obtener los datos'}
              </Text>
              <TouchableOpacity
                style={{
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'blue',
                  borderRadius: 10,
                  marginTop: 10,
                }}
                onPress={() => {
                  this.setState({ isLoading: true });
                  this.setState({ isLoading: false });
                }}>
                <Text style={{ color: '#FFF' }}>Reintentar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flex: 7,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ScrollView style={{ flex: 1, width: '90%' }}>
                <Text style={styles.inputHolders}>{'Nombre:'}</Text>
                <TextInput
                  ref={input => (this.nombre = input)}
                  style={styles.inputField}
                  value={this.data.description}
                  onChangeText={val => {
                    this.data.description = val.toUpperCase();
                    this.setState({ emptyError: true });
                    this.emptyFields.description = false;
                    this.setState({ emptyError: false });
                  }}
                  onSubmitEditing={() => {
                    if (this.data.description === '') {
                      this.setState({ emptyError: true });
                      this.emptyFields.description = true;
                    } else {
                      this.setState({ emptyError: false });
                      this.emptyFields.description = false;
                    }
                    this.existencias.focus();
                  }}
                />
                {this.emptyFields.description ? (
                  <Text style={styles.errorInInput}>
                    {'Este campo es necesario'}
                  </Text>
                ) : (
                  <Text />
                )}
                <Text style={styles.inputHolders}>{'Existencias:'}</Text>
                <TextInput
                  style={styles.inputField}
                  keyboardType="number-pad"
                  ref={input => (this.existencias = input)}
                  value={`${this.data.stock}`}
                  onChangeText={val => {
                    this.data.stock = val;
                    this.setState({ emptyError: true });
                    this.emptyFields.stock = false;
                    this.setState({ emptyError: false });
                  }}
                  onSubmitEditing={() => {
                    if (this.data.stock == '') {
                      this.setState({ emptyError: true });
                      this.emptyFields.stock = true;
                    } else {
                      this.setState({ emptyError: false });
                      this.emptyFields.stock = false;
                    }
                    this.existenciasMin.focus();
                  }}
                />
                {this.emptyFields.stock ? (
                  <Text style={styles.errorInInput}>
                    {'Este campo es necesario'}
                  </Text>
                ) : (
                  <Text />
                )}
                <Text style={styles.inputHolders}>{'Existencias min:'}</Text>
                <TextInput
                  style={styles.inputField}
                  keyboardType="number-pad"
                  ref={input => (this.existenciasMin = input)}
                  value={`${this.data.min_stock}`}
                  onChangeText={val => {
                    this.data.min_stock = val;
                    this.setState({ emptyError: true });
                    this.emptyFields.min_stock = false;
                    this.setState({ emptyError: false });
                  }}
                  onSubmitEditing={() => {
                    if (this.data.min_stock == '') {
                      this.setState({ emptyError: true });
                      this.emptyFields.min_stock = true;
                    } else {
                      this.setState({ emptyError: false });
                      this.emptyFields.min_stock = false;
                    }
                    this.costo.focus();
                  }}
                />
                {this.emptyFields.min_stock ? (
                  <Text style={styles.errorInInput}>
                    {'Este campo es necesario'}
                  </Text>
                ) : (
                  <Text />
                )}
                <Text style={styles.inputHolders}>{'Costo:'}</Text>
                <TextInput
                  style={styles.inputField}
                  keyboardType="number-pad"
                  ref={input => (this.costo = input)}
                  value={`${this.data.cost}`}
                  onChangeText={val => {
                    this.data.cost = val;
                    this.setState({ emptyError: true });
                    this.emptyFields.cost = false;
                    this.setState({ emptyError: false });
                  }}
                  onSubmitEditing={() => {
                    if (this.data.cost == '') {
                      this.setState({ emptyError: true });
                      this.emptyFields.cost = true;
                    } else {
                      this.setState({ emptyError: false });
                      this.emptyFields.cost = false;
                    }
                    this.precio.focus();
                  }}
                />
                {this.emptyFields.cost ? (
                  <Text style={styles.errorInInput}>
                    {'Este campo es necesario'}
                  </Text>
                ) : (
                  <Text />
                )}
                <Text style={styles.inputHolders}>{'Precio:'}</Text>
                <TextInput
                  style={styles.inputField}
                  keyboardType="number-pad"
                  ref={input => (this.precio = input)}
                  value={`${this.data.unit_price}`}
                  onChangeText={val => {
                    this.data.unit_price = val;
                    this.setState({ emptyError: true });
                    this.emptyFields.unit_price = false;
                    this.setState({ emptyError: false });
                  }}
                  onSubmitEditing={() => {
                    if (this.data.unit_price == '') {
                      this.setState({ emptyError: true });
                      this.emptyFields.unit_price = true;
                    }
                  }}
                />
                {this.emptyFields.unit_price ? (
                  <Text style={styles.errorInInput}>
                    {'Este campo es necesario'}
                  </Text>
                ) : (
                  <Text />
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    paddingBottom: 20,
                  }}>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                      Alert.alert(
                        'Alerta',
                        'Seguro que quiere eliminar este producto',
                        [
                          {
                            text: 'Si',
                            onPress: () => {this.deleteItem();}
                          },
                          {
                            text: 'No',
                            style: 'cancel',
                          },
                        ],
                        { cancelable: true }
                      );
                    }}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => {
                      this.saveData();
                    }}>
                    <Text style={styles.buttonText}>Enviar</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          )}
        </SafeAreaView>
      );
    }
  }
}

var styles = StyleSheet.create({
  inputHolders: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 20,
  },
  inputField: {
    borderBottomColor: 'rgba(100,100,255,1)',
    borderBottomWidth: 2,
    lineHeight: 30,
    fontSize: 18,
  },
  errorInInput: {
    color: 'red',
    fontSize: 12,
  },
  deleteButton: {
    width: 100,
    height: 50,
    backgroundColor: 'rgba(250,50,100,1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    marginRight: 5,
  },
  sendButton: {
    width: 100,
    height: 50,
    backgroundColor: 'rgba(100,50,250,1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'century-gothic',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
