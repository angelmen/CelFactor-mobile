import React, { Component } from 'react';
import {
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  AsyncStorage,
} from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
//import AsyncStorage from '@react-native-community/async-storage';

function Product({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.product}
      onPress={() => {
        navigation.navigate('EditProduct', { data: item });
      }}>
      <Text style={styles.productDesc}>{item.description}</Text>
      <Text style={styles.productDetail}>{'Cantidad: ' + item.stock}</Text>
      <Text style={styles.productDetail}>{'Costo: ' + item.cost}</Text>
    </TouchableOpacity>
  );
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

export default function Screen() {
  const isFocused = useIsFocused();
  if (isFocused) {
    return <GetProducts />;
  } else {
    return <View />;
  }
}

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@listOfProducts', jsonValue);
  } catch (e) {
    alert(e);
    // saving error
  }
};

export class GetProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: '',
      dataSource: '',
      editing: false,
      refreshing: false,
      error: false,
    };
    this.arrayholder = [];
    this.myComponent = React.createRef();
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const url = 'https://celfactor-api.glitch.me/v2/products/?belong_to=1';

    fetch(url)
      .then(result => {
        if (!result.ok) throw Error(result.statusText);
        return result.json();
      })
      .then(responseJson => {
        this.setState({ isLoading: true });
        if (responseJson.ok === false) {
          this.setState({ isLoading: false, error: responseJson.message });
          return;
        }
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.data,
          }, ()=>{
            this.arrayholder = responseJson.data
          }
        );
      })
      .catch(error => {
        this.setState({ isLoading: false, error: error.message });
      });
    return this.state.isLoading;
  }

  onRefresh() {
    this.setState({ isLoading: true, refreshing: true }, () => {
      this.getData();
      this.setState({ refreshing: false });
    });
  }

  renderHeader() {
    return (
      <SearchBar
        containerStyle={{ backgroundColor: '#FFF', marginBottom: 10 }}
        lightTheme
        round
        editable={true}
        placeholder="Buscar producto"
        onChangeText={text => this.SearchFilterFunction(text)}
        onClear={text => this.SearchFilterFunction('')}
        value={this.state.search}
      />
    );
  }

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    ) : (
      <View style={{ flex: 1}}>
        {this.renderHeader()}
        {!this.state.error ? (
          <FlatList
            ref={this.myComponent}
            data={this.state.dataSource}
            refreshControl={
              <RefreshControl
                //colors={['#9Bd35A', '#689F38']}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Product item={item} />}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>
              {this.state.error}
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: 'blue',
                borderRadius: 10,
                marginTop: 50,
              }}
              onPress={this.getData}>
              <Text style={{ color: '#fff' }}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  product: {
    alignSelf: 'center',
    width: '90%',
    borderWidth: 0,
    marginBottom: 10,
    padding: 10,
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
    fontFamily: 'century-gothic',
    fontSize: 20,
  },
  productDetail: {
    color: '#B885FF',
  },
});
