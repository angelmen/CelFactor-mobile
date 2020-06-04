import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar
} from 'react-native';

//import components
import NavHeader from '../components/navHeader'

export default class Home extends Component {
  render() {
    return (
      <SafeAreaView forceInset={{ top: 'always' }}>
        <StatusBar barStyle={'ligth-content'} backgroundColor="#000455" />

          <NavHeader name="Inicio"/>
      </SafeAreaView>
    );
  }
}
