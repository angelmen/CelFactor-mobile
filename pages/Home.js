import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//import components
import NavHeader from '../components/navHeader'

export default class Home extends Component {
  render() {
    return (
      <SafeAreaView forceInset={{ top: 'always' }}>
        <View>
          <NavHeader name="Inicio"/>
        </View>
      </SafeAreaView>
    );
  }
}
