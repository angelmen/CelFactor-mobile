import React, { Component, useEffect, useState } from 'react';
import { SearchBar } from 'react-native-elements';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Button
} from 'react-native';
import {useNavigation} from '@react-navigation/native'

import NavHeader from '../components/navHeader';
import Icon from 'react-native-vector-icons/FontAwesome';

import GetProducts from '../components/Inventario/GetProducts';
import AddProductButton from '../components/Inventario/AddProductButton';

export default class Inventario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      search: ""
    };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
    setInterval(() => {
      this.setState({ isLoading: true });
      this.setState({ isLoading: false });
    }, 900000);
  }

  filter(str){
    this.setState({search: str});
  }

  componentWillUnmount() {
    this.setState({ isLoading: true });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
          <ActivityIndicator />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView
          forceInset={{ top: 'always' }}
          style={{ flex: 1, backgroundColor: '#fff' }}>
          <NavHeader name={'Inventario'} />
          <GetProducts />
          <AddProductButton />
        </SafeAreaView>
      );
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
