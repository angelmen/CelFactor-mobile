import React, { Component } from 'react';
import {
  View,
  SafeAreaView
} from 'react-native';

//import components
import NavHeader from '../components/navHeader'

export default class Home extends Component {
  render() {
    return (
      <SafeAreaView forceInset={{ top: 'always' }}>
          <NavHeader name="Inicio"/>
      </SafeAreaView>
    );
  }
}
