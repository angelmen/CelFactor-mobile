import React from 'react'
import {View, ImageBackground, TouchableWithoutFeedback, Image, StyleSheet, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function NavHeader({name}){
  const navigation = useNavigation();

  return(
            <ImageBackground
              style={styles.header}
              source={require('../assets/images/Gradient_mmOEJc4.png')}>
              <TouchableWithoutFeedback onPress={navigation.openDrawer}>
                <Image
                  style={styles.headerMeuBtn}
                  source={require('../assets/images/drawer.png')}
                />
              </TouchableWithoutFeedback>
              <Text style={styles.navMenuName}>{name}</Text>
            </ImageBackground>
  )
}

var styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  headerMeuBtn: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  navMenuName: {
    fontFamily: 'century-gothic',
    fontSize: 30,
    marginLeft: 30,
    color: '#fff'
  }
});