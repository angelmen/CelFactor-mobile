import React from 'react';
import {
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function NavHeader({ name, icon }) {
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={styles.header}
      source={require('../assets/images/Gradient_mmOEJc4.png')}>
      {icon == 'back' ? (
        <TouchableWithoutFeedback
          onPress={navigation.goBack}>
          <AntDesign
            style={styles.headerMeuBtn}
            name="left"
            size={30}
            color="black"
          />
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback onPress={navigation.openDrawer}>
          <Ionicons
            style={styles.headerMeuBtn}
            name="md-menu"
            size={30}
            color="black"
          />
        </TouchableWithoutFeedback>
      )}
      <Text style={styles.navMenuName}>{name}</Text>
    </ImageBackground>
  );
}

var styles = StyleSheet.create({
  header: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  headerMeuBtn: {
    width: 24,
    marginLeft: 15,
    marginBottom: 10,
  },
  navMenuName: {
    fontFamily: 'century-gothic',
    fontSize: 30,
    marginLeft: 20,
    color: '#fff',
    lineHeight: 30,
    marginBottom: 10,
  },
});
