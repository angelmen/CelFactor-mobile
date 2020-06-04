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

import NavHeader from '../../components/navHeader';
import AddClientButton from '../../components/Clientes/AddClientButton';

export default function Builder({ route }) {
  const navigation = useNavigation();
  if (useIsFocused()) {
    return <Clientes navigation={navigation} params={route.params} />;
  } else {
    return <View />;
  }
}

class Clientes extends Component {
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
    const url = 'https://celfactor-api.glitch.me/v2/clients/?buysIn=1';
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
        placeholder="Buscar cliente"
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
    return this.state.isLoading ? (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <NavHeader name={'Clientes'} />
        <View
          style={{ flex: 1, justifyContent: 'center', alingItems: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
      </SafeAreaView>
    ) : this.state.error ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <NavHeader name={'Clientes'} />
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
    ) : (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <NavHeader name={'Clientes'} />
        {this.renderSearchBar()}
        <ScrollView style={{ flex: 1, padding: 20 }}>
          {this.state.dataSource.map((client) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: '#FFF',
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  padding: 10,
                  margin: 5,
                }} activeOpacity= {0.8} onPress={()=>{
                  this.props.navigation.navigate('EditClient', { data: client })
                }}>
                <Text
                  style={{
                    color: '#18C5F2',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {'Nombre: ' + client.name}
                </Text>
                <Text
                  style={{
                    color: '#707070',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  {'Trabaja en: ' + client.company_owned_name}
                </Text>
                <Text
                  style={{
                    color: '#707070',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  {'Total comprado: ' + client.totalPurchased}
                </Text>
                <Text
                  style={{
                    color: '#707070',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  {'Credito maximo: ' + client.maxCredit}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <AddClientButton />
      </SafeAreaView>
    );
  }
}
