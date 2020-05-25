import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import NavHeader from '../components/navHeader';

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
    this.data = {
      description: '',
      stock: 0,
      min_stock: 0,
      cost: 0,
      unit_price: 0,
      belong_to: 1,
    };
    this.emptyFields = {
      description: false,
      stock: false,
      min_stock: false,
      cost: false,
      unit_price: false,
    };
  }

  clearFields() {
    this.nombre.clear();
    this.existencias.clear();
    this.existenciasMin.clear();
    this.costo.clear();
    this.precio.clear();
  }

  saveData() {
    const url = 'https://celfactor-api.glitch.me/v2/products/';
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.data),
      })
        .then(response => response.json())
        .then(responseJson => {
          alert(responseJson.message);
          this.clearFields();
        });
    } catch (e) {
      console.log(e);
    }
    this.nombre.focus();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1}}>
        <NavHeader icon="back" name="Agregar" />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
            paddingBottom: 20
          }}>
          <ScrollView style={{ flex: 1, width: '90%' }}>
            <Text style={styles.inputHolders}>{'Nombre:'}</Text>
            <TextInput
              autoFocus={true}
              ref={input => (this.nombre = input)}
              style={styles.inputField}
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

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.saveData();
              }}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
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
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'rgba(100,50,250,1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'century-gothic',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
