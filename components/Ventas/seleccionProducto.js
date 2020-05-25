import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import { SearchBar, ListItem } from 'react-native-elements';

import { useIsFocused } from '@react-navigation/native';

export default function Screen() {
  const isFocused = useIsFocused();
  if (isFocused) {
    return <SeleccionProducto />;
  } else {
    return <View />;
  }
}

async function getData() {
  try {
    const jsonValue = await AsyncStorage.getItem('@listOfProducts');
    return jsonValue != null ? JSON.parse(jsonValue).data : null;
  } catch (e) {
    alert('error loading the data!', e);
    // error reading value
  }
}

export class SeleccionProducto extends Component {
  constructor() {
    super();
    this.state = {
      serverData: [],
      arrayholder: [],
      search: '',
      isLoading: true,
      text: '',
      editing: false,
      refreshing: false,
      error: false,
      showItems: false,
    };
  }

  componentDidMount() {
    getData().then(data => {
      this.setState({ serverData: data, arrayholder: data, isLoading: false });
    });
  }

  renderHeader() {
    return (
      <SearchBar
        lightTheme
        editable={true}
        ref={(input)=>this.mySearchBar = input}
        placeholder="Buscar producto"
        onFocus={() => this.setState({ showItems: true })}
        onChangeText={text => this.SearchFilterFunction(text)}
        onClear={text => this.SearchFilterFunction('')}
        value={this.state.search}
        inputContainerStyle={{ maxHeight: 20 }}
        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
      />
    );
  }

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.state.arrayholder.filter(function(item) {
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
      serverData: newData,
      search: text,
    });
  }

  render() {
    return this.state.isLoading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    ) : (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.state.showItems ? (
          <FlatList
            ref={this.myComponent}
            data={this.state.serverData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Product item={item} />}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
}

function Product({ item }) {
  return (
    <TouchableOpacity
      style={styles.product}
      onPress={() => {
        Alert.alert(item.description);
      }}>
      <Text style={styles.productDesc}>{item.description}</Text>
      <Text style={styles.productDetail}>{'Restantes: ' + item.stock}</Text>
      <Text style={styles.productDetail}>{'Precio: ' + item.unit_price}</Text>
    </TouchableOpacity>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 12
  },
});
