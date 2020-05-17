import React, {useState} from 'react';
import Routes from './Routes';
import {AppLoading} from 'expo';
import { SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const fetchFonts = async () => {
  await Font.loadAsync({
    'calibri-regular': require('./assets/fonts/Calibri.ttf'),
    'century-gothic': require('./assets/fonts/gothic.ttf'),
  })
}

export default function App(props) {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <SafeAreaView>
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      /></SafeAreaView>
    )
  } else if (dataLoaded) {
    return(
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    )
  }
}