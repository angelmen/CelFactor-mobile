import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { SearchBar, ListItem } from 'react-native-elements';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import NavHeader from '../components/navHeader';

export default function Builder({ route }) {
  const navigation = useNavigation();
  if (useIsFocused()) {
    return <Index params={route.params} navigation={navigation} />;
  } else {
    return <View />;
  }
}
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: false,
      dataSource: [],
      showDropdown: false,
      order: [],
      count: 0,
      search: ""
    };
    this.arrayHolder = [];
  }

  componentDidMount() {
    if (this.props.params?.order) {
      this.setState({ order: this.props.params.order });
    }
    this.getData();
  }

  getData() {
    const url = 'https://celfactor-api.glitch.me/v2/products/?belong_to=1';
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

  renderSearchBar() {
    return (
      <SearchBar
        lightTheme
        containerStyle={{ backgroundColor: 'transparent', padding: 0 }}
        editable={true}
        placeholder="Buscar producto"
        onChangeText={text => this.searchFilterFunction(text)}
        onClear={text => this.searchFilterFunction('')}
        value={this.state.search}
      />
    );
  }

  searchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayHolder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.description
        ? item.description.toUpperCase()
        : ''.toUpperCase();
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
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={'ligth-content'} backgroundColor="#000455" />
        <NavHeader name="Ventas" />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    ) : (
      <SafeAreaView style={{flex: 1}}>
          <StatusBar barStyle={'ligth-content'} backgroundColor="#000455" />
        <NavHeader name="Ventas" />
        <View style={{flex: 1}}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 10 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
              Modulo de Ventas
            </Text>
          </View>
          <View style={{ flex: 5, paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ showDropdown: !this.state.showDropdown });
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
                <Text style={{ fontSize: 16 }}>Seleccionar producto</Text>
                <FontAwesome5
                  name={this.state.showDropdown ? 'caret-up' : 'caret-down'}
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>
            {this.state.showDropdown ? (
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
                  <Text style={{ fontWeight: 'bold' }}>Precio</Text>
                </View>
                <FlatList
                  style={{maxHeight: 150}}
                  data={this.state.dataSource}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('AddProductsToOrder', {
                            item,
                            order: this.state.order,
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
                          <Text>{item.description}</Text>
                          <Text>RD${item.unit_price}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            ) : (
              <View />
            )}
            <View style={{ paddingVertical: 30 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Esta orden
              </Text>
            </View>
            <ScrollView
              style={{ maxHeight: 250 }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              {this.state.order.map((orderItem, index) => {
                return (
                  <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        padding: 10,
        margin: 5,
        borderRadius: 5,
      }}>
      <TouchableOpacity style={{ flex: 3 }}>
        <View>
          <Text
            style={{
              color: '#18C5F2',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {orderItem.item.description + ' x' + orderItem.quantity}
          </Text>
          <Text
            style={{
              color: '#707070',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {orderItem.details}
          </Text>
          <Text
            style={{
              color: '#707070',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            RD${orderItem.total}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ alignSelf: 'flex-end', flex: 1 }}>
        <TouchableOpacity 
          onPress={()=>{
            this.state.order.splice(index, 1)
            this.setState({order: this.state.order})
          }}
        >
          <Text
            style={{
              color: '#F11E1E',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            eliminar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
                )
              })}
            </ScrollView>
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
                  this.setState({ order: [] });
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
                onPress={()=>{
                  if(this.state.order.length > 0){
                  this.props.navigation.navigate('Cobrar', {order: this.state.order})
                  } else {
                    alert("Primero debe agregar productos a la orden")
                  }
                }}
                >
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
