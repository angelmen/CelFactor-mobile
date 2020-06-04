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

import NavHeader from '../../components/navHeader';

export default class AddClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
    this.data = {
      name: '',
      buysIn: 1, //el id de la compañia
      maxCredit: 0,
      company_owned_name: '',
      totalPurchased: 0,
    };
    this.emptyFields = {
      name: false,
      buysIn: false,
      maxCredit: false,
      owned_company_name: false,
      totalPurchased: false,
    };
  }

  clearFields() {
    this.nombre.clear();
    this.creditoMaximo.clear();
    this.nombreCompania.clear();
    this.totalComprado.clear();
  }

  saveData() {
    const url = 'https://celfactor-api.glitch.me/v2/clients/';
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
                this.data.name = val.toUpperCase();
                this.setState({ emptyError: true });
                this.emptyFields.name = false;
                this.setState({ emptyError: false });
              }}
              onSubmitEditing={() => {
                if (this.data.name === '') {
                  this.setState({ emptyError: true });
                  this.emptyFields.name = true;
                } else {
                  this.setState({ emptyError: false });
                  this.emptyFields.name = false;
                }
                this.creditoMaximo.focus();
              }}
            />
            {this.emptyFields.name ? (
              <Text style={styles.errorInInput}>
                {'Este campo es necesario'}
              </Text>
            ) : (
              <Text />
            )}
            <Text style={styles.inputHolders}>{'Credito maximo:'}</Text>
            <TextInput
              style={styles.inputField}
              keyboardType="number-pad"
              ref={input => (this.creditoMaximo = input)}
              onChangeText={val => {
                this.data.maxCredit = val;
                this.setState({ emptyError: true });
                this.emptyFields.maxCredit = false;
                this.setState({ emptyError: false });
              }}
              onSubmitEditing={() => {
                if (this.data.maxCredit == '') {
                  this.setState({ emptyError: true });
                  this.emptyFields.maxCredit = true;
                } else {
                  this.setState({ emptyError: false });
                  this.emptyFields.maxCredit = false;
                }
                this.nombreCompania.focus();
              }}
            />
            {this.emptyFields.maxCredit ? (
              <Text style={styles.errorInInput}>
                {'Este campo es necesario'}
              </Text>
            ) : (
              <Text />
            )}
            <Text style={styles.inputHolders}>{'Nombre de compañía:'}</Text>
            <TextInput
              style={styles.inputField}
              ref={input => (this.nombreCompania = input)}
              onChangeText={val => {
                this.data.company_owned_name = val;
                this.setState({ emptyError: true });
                this.emptyFields.company_owned_name = false;
                this.setState({ emptyError: false });
              }}
              onSubmitEditing={() => {
                if (this.data.company_owned_name == '') {
                  this.setState({ emptyError: true });
                  this.emptyFields.company_owned_name = true;
                } else {
                  this.setState({ emptyError: false });
                  this.emptyFields.company_owned_name = false;
                }
                this.totalComprado.focus();
              }}
            />
            {this.emptyFields.company_owned_name ? (
              <Text style={styles.errorInInput}>
                {'Este campo es necesario'}
              </Text>
            ) : (
              <Text />
            )}
            <Text style={styles.inputHolders}>{'Total comprado:'}</Text>
            <TextInput
              style={styles.inputField}
              keyboardType="number-pad"
              ref={input => (this.totalComprado = input)}
              onChangeText={val => {
                this.data.totalPurchased = val;
                this.setState({ emptyError: true });
                this.emptyFields.totalPurchased = false;
                this.setState({ emptyError: false });
              }}
              onSubmitEditing={() => {
                if (this.data.totalPurchased == '') {
                  this.setState({ emptyError: true });
                  this.emptyFields.totalPurchased = true;
                } else {
                  this.setState({ emptyError: false });
                  this.emptyFields.totalPurchased = false;
                }
              }}
            />
            {this.emptyFields.totalPurchased ? (
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
