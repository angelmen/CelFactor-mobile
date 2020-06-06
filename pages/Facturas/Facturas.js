import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as Print from 'expo-print';


import NavHeader from '../../components/navHeader'

export default function Builder({route}){
  const navigation = useNavigation();
  if(useIsFocused()){
    return <Facturas navigation={navigation} params={route.params}/>
  }else{
    return <View />
  }
}

class Facturas extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      error: false,
      errorMsg: '',
      search: '',
    };
    this.arrayHolder = [];
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const url = 'https://celfactor-api.glitch.me/v2/invoices/?belong_to=1';
    this.setState({ isLoading: true, error: false, errorMsg: '' }, () => {
      setTimeout(() => {
        this.state.isLoading
          ? this.setState({
            isLoading: false,
            error: true,
            errorMsg: 'Tenemos problemas de conexion',
          })
          : '';
      }, 3000);
    });
    fetch(url)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((responseJson) => {
        this.setState(
          { isLoading: false, dataSource: responseJson.data },
          () => {
            this.arrayHolder = responseJson.data;
          }
        );
      })
      .catch((e) => {
        this.setState({ error: true, errorMsg: e });
      });
  }

  renderSearchBar() {
    return (
      <SearchBar
        lightTheme
        containerStyle={{ backgroundColor: '#FFF' }}
        round
        editable={true}
        placeholder="Buscar factura por codigo"
        onChangeText={(text) => this.searchFilterFunction(text)}
        onClear={(text) => this.searchFilterFunction('')}
        value={this.state.search}
      />
    );
  }

  searchFilterFunction(text) {
    const newData = this.arrayHolder.filter(function (item) {
      const itemData = item.id ? item.id.toString().toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  render(){
    return this.state.isLoading ? (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <NavHeader name={'Facturas'} />
        <View
          style={{ flex: 1, justifyContent: 'center', alingItems: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
      </SafeAreaView>
    ) : this.state.error ? (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <NavHeader name={'Facturas'} />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
            {this.state.errorMsg}
          </Text>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: 'blue',
              borderRadius: 10,
              margin: 20,
            }}
            onPress={() => {
              this.getData();
            }}>
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
              Reintentar
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      ) : this.state.dataSource.length == 0 ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
          <NavHeader name={'Facturas'} />
          {this.renderSearchBar()}
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 20, textAlign: "center"}}>Nada aqui</Text>
          </View>
        </SafeAreaView>) : (
          <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <NavHeader name={'Facturas'} />
            {this.renderSearchBar()}
            <ScrollView style={{ flex: 1, padding: 20 }}>
              {this.state.dataSource.map((invoice, key) => {
                return (
                  <TouchableOpacity
                    key={key}
                    style={{
                      backgroundColor: '#FFF',
                      elevation: 5,
                      shadowColor: 'black',
                      shadowOpacity: 0.3,
                      shadowRadius: 5,
                      padding: 10,
                      margin: 5,
                    }} activeOpacity={0.8} onPress={() => {
                      Print.printAsync(printOptions(invoice.products, invoice.client_name, invoice.payment_method))
                    }}>
                    <Text
                      style={{
                        color: '#18C5F2',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      {'Codigo: ' + invoice.id}
                    </Text>
                    <Text
                      style={{
                        color: '#707070',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      {'Cliente: ' + invoice.client_name}
                    </Text>
                    <Text
                      style={{
                        color: '#707070',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      {'Fecha: ' + invoice.invoice_date}
                    </Text>
                    <Text
                      style={{
                        color: '#707070',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      {'Metodo de pago: ' + invoice.payment_method}
                    </Text>
                    <Text
                      style={{
                        color: '#707070',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      {'Total comprado: ' + 'RD$' + invoice.total_to_pay}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        );
  }
}

function printOptions(order, client, method) {
  var today = new Date();

  var products = []
  var total = 0

  order.map((item, index) => {
    var newItem =
      `<tr>
        <td  rowspan='2'> ${(index + 1)} </td>
        <td>  ${(item.description)} </td>
        <td rowspan='2'>
          ${(item.quantity)} </td><td rowspan='2'>RD$ 
          ${parseFloat(item.unit_price).toFixed(2)} </td>
        <td class='itemTotal' rowspan='2'>RD$ ${parseFloat(item.unit_price * item.quantity).toFixed(2)} </td>
      </tr>
      <tr>
        <td> ${(item.details) || "SIN DETALLES"} </td>
      </tr>`;
    total = (item.unit_price * item.quantity) + total
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