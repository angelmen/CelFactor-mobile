import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import AddProduct from '../../pages/AddProduct'

export default function AddProductButton() {
    const navigation = useNavigation();

    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          elevation: 50
        }} onPress={() => {navigation.navigate('AddProduct')}}>
        <Ionicons
          name="md-add-circle-outline"
          size={60}
          color="rgba(100,80,250,1)"
        />
      </TouchableOpacity>
    );
}
