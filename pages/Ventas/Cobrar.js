import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { SearchBar, ListItem } from 'react-native-elements';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import * as Print from 'expo-print';


import NavHeader from '../../components/navHeader';

export default function Builder({ route }) {
  const navigation = useNavigation();
  if (useIsFocused()) {
    return <Cobrar params={route.params} navigation={navigation} />;
  } else {
    return <View />;
  }
}

var today = new Date();
class Cobrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: false,
      dataSource: [],
      showClientsDropdown: false,
      showMethodDropdown: false,
      order: [],
      clients: [],
      clientDropdownMsg: 'Seleccionar cliente',
      search: '',
      selectedClient: {},
      paymentMethodDropdownMsg: 'Metodo de pago',
      selectedPaymentMethod: {}
    };
    this.arrayHolder = [];
    this.paymentMethods = [
      { name: 'Efectivo' },
      { name: 'Credito corto plazo' },
      { name: 'Credito largo plazo' },
    ];
    this.invoiceData = {
        belong_to: 1,
        seller_name: 'Sterling Zabala',
        client_name: '',
        client_company_name: '',
        company_name: 'YoSmart',
        products: this.props.params.order,
        total_to_pay: this.total(),
        invoice_date: `${today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()}`,
        company_information: [{
          "id": 1,
          "organization_name": "Mendez Solutions",
          "location": "n/a",
          "email": "admd1112@gmail.com",
          "phones": ["8097778478"],
          "rnc": "RNC0000001"
        }],
        paymentMethod: this.selectedPaymentMethod,
      }
  }
  total(){
  var total = 0;
  this.props.params.order.map((item) => {
    total = (item.item.unit_price * item.quantity) + total;
    console.log(item);

  })
  return total
}

  componentDidMount() {
    if (this.props.params?.order) {
      this.setState({ order: this.props.params.order });
    }
    this.getData();
  }

  getData() {
    const url = 'https://celfactor-api.glitch.me/v2/clients/?buysIn=1';
    fetch(url)
      .then((result) => {
        if (!result.ok) throw Error(result.statusText);
        return result.json();
      })
      .then((responseJson) => {
        if (responseJson.ok === false) {
          this.setState({ isLoading: false, error: responseJson.message });
          return;
        }
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.data,
          },
          () => {
            this.arrayHolder = responseJson.data;
          }
        );
      })
      .catch((error) => {
        this.setState({ isLoading: false, error: error.message });
      });
  }

  clear() {
    this.setState({});
  }

  async saveInvoice(){
    const url = `https://celfactor-api.glitch.me/v2/invoices/`
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.invoiceData),
      })
        .then(response => response.json())
        .then(responseJson => {
          alert(responseJson.message);
        });
    } catch (e) {
      console.log(e);
    }
    
    
  }

  renderSearchBar() {
    return (
      <SearchBar
        lightTheme
        containerStyle={{ backgroundColor: 'transparent', padding: 0 }}
        editable={true}
        placeholder="Buscar"
        onChangeText={(text) => this.searchFilterFunction(text)}
        onClear={(text) => this.searchFilterFunction('')}
        value={this.state.search}
      />
    );
  }

  searchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayHolder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  }

  render() {
    return (
      <SafeAreaView>
        <NavHeader name="Cobrar" icon="back" />
        <View>
          <View style={{ alignSelf: 'center', paddingVertical: 50 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Realizar factura
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
              No.0001
            </Text>
          </View>
          <View style={{ paddingHorizontal: 30 }}>
            <View style={{ margin: 15 }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showClientsDropdown: !this.state.showClientsDropdown,
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    borderWidth: 2,
                    borderRadius: 5,
                    padding: 10,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}>
                  <Text style={{ fontSize: 16 }}>
                    {this.state.clientDropdownMsg}
                  </Text>
                  <FontAwesome5
                    name={
                      this.state.showClientsDropdown ? 'caret-up' : 'caret-down'
                    }
                    size={24}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
              {this.state.showClientsDropdown ? (
                <View
                  style={{
                    padding: 10,
                    borderWidth: 2,
                    borderRadius: 5,
                    borderTopWidth: 0,
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                  }}>
                  {this.renderSearchBar()}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 10,
                    }}>
                    <Text style={{ fontWeight: 'bold' }}>Nombre</Text>
                  </View>
                  <FlatList
                    style={{ maxHeight: 150 }}
                    data={this.state.dataSource}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              clientDropdownMsg: item.name,
                              showClientsDropdown: false,
                              selectedClient: item
                            }, ()=>{
                              this.invoiceData.client_name = item.name;
                              this.invoiceData.client_company_name = item.company_owned_name
                            });
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              padding: 10,
                              borderWidth: 1,
                              borderRadius: 5,
                              marginBottom: 5,
                            }}>
                            <Text>{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              ) : (
                <View />
              )}
            </View>
            <View style={{ margin: 15 }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showMethodDropdown: !this.state.showMethodDropdown,
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    borderWidth: 2,
                    borderRadius: 5,
                    padding: 10,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}>
                  <Text style={{ fontSize: 16 }}>
                    {this.state.paymentMethodDropdownMsg}
                  </Text>
                  <FontAwesome5
                    name={
                      this.state.showMethodDropdown ? 'caret-up' : 'caret-down'
                    }
                    size={24}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
              {this.state.showMethodDropdown ? (
                <View
                  style={{
                    padding: 10,
                    borderWidth: 2,
                    borderRadius: 5,
                    borderTopWidth: 0,
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 10,
                    }}>
                    <Text style={{ fontWeight: 'bold' }}>Metodo</Text>
                  </View>
                  <FlatList
                    style={{ maxHeight: 150 }}
                    data={this.paymentMethods}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              selectedPaymentMethod: item.name,
                              showMethodDropdown: false,
                              paymentMethodDropdownMsg: item.name,
                            }, ()=>{
                              this.invoiceData.paymentMethod = item.name;
                            });
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              padding: 10,
                              borderWidth: 1,
                              borderRadius: 5,
                              marginBottom: 5,
                            }}>
                            <Text>{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              ) : (
                <View />
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 15,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  padding: 15,
                  borderRadius: 10,
                }}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <View>
                  <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
                    Cancelar
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: 'blue',
                  padding: 15,
                  paddingHorizontal: 25,
                  borderRadius: 10,
                }}
                onPress={() => {
                  this.saveInvoice().then(
                  Alert.alert(
                    'Alerta',
                    'Desea guardar la factura localmente?',
                    [
                      {
                        text: 'Si',
                        onPress: () => { Print.printAsync(printOptions(this.props.params.order, this.state.selectedClient, this.state.selectedPaymentMethod)) }
                      },
                      {
                        text: 'No',
                        style: 'cancel',
                      },
                    ],
                    { cancelable: true }
                  ))
                }}>
                <View>
                  <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
                    Cobrar
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}


var products = []
var total = 0

function printOptions(order, client, method){
  

  order.map( (item, index)=>{
    var newItem = 
    `<tr>
        <td  rowspan='2'> ${(index + 1)} </td>
        <td>  ${(item.item.description)} </td>
        <td rowspan='2'>
          ${(item.quantity)} </td><td rowspan='2'>RD$ 
          ${parseFloat(item.item.unit_price).toFixed(2)} </td>
        <td class='itemTotal' rowspan='2'>RD$ ${parseFloat(item.item.unit_price*item.quantity).toFixed(2)} </td>
      </tr>
      <tr>
        <td> ${(item.item.details) || "SIN DETALLES"} </td>
      </tr>`;
    total = (item.item.unit_price * item.quantity) + total
    products.push(newItem)
  })


  var options = {
    html: 
    `
       <div class="factura" style="width: fit-content;margin: auto;">
                <h1 style="text-align: center;">YoSmart</h1>
                <h5 style="text-align: center;">Plaza Jean Luis, Prolongación 27 de febrero, antes de la Av. Isabel Aguiar. <br> Cel.:+1(809)-409-1677</h5>
                <div><a style="font-weight: bold;">Fecha: </a><a class="value">${today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()}</a></div>
                <div><a style="font-weight: bold;">Cliente: </a><a class="value">${client}</a></div>
                <div><a style="font-weight: bold;">Método de pago: </a><a class="value">${method}</a></div>
                <div><a style="font-weight: bold;">Le atendio: </a><a class="value">Sterling Zabala</a></div>
                <br>
                <div class="tabla-productos" style="width: 100%;margin: auto;">
            
                    <table id="productos" border="1" style="width: 100%;">
                            <tr>
                                <td>No.</td>
                                <td>Producto</td>
                                <td>Cant.</td>
                                <td>Precio Uni.</td>
                                <td>Total</td>
                            </tr>
                            ${products}
                    </table>
                    <table id="resultado" style="margin-left: auto; margin-right: 0;">
                        <tbody>
                            <tr>
                                <td>
                                <td>
                                <td></td>
                                </td>
                                </td>
                                <td>Total</td>
                                <td>RD$${parseFloat((total - (total * 0.18)).toFixed(2))}</td>
                            </tr>
                            <tr>
                                <td>
                                <td>
                                <td></td>
                                </td>
                                </td>
                                <td>ITBIS</td>
                                <td>RD$${parseFloat((total * 0.18).toFixed(2))}</td>
                            </tr>
                            <tr>
                                <td>
                                <td>
                                <td></td>
                                </td>
                                </td>
                                <td>Total a pagar</td>
                                <td>RD$${parseFloat(total).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    `
  }


  return options
}