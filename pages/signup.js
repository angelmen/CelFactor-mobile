import React, {useState} from "react";
import { StyleSheet, Text, ScrollView, StatusBar, View, ImageBackground, TouchableOpacity, Dimensions} from 'react-native';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

import Form from '../components/form';
import Logo from '../components/logo';
import { Actions } from "react-native-router-flux";

function back(){
    Actions.pop();
}

function SignUp(props) {
    var deviceWidth = Math.round(Dimensions.get('window').width)
    const smallDevice = () => {
        if (deviceWidth <= 480) {
            return false;
        } else {
            return true;
        }
    };
    const midDevice = () => {
        if (deviceWidth <= 996) {
            return false;
        } else {
            return true;
        }
    };
    const bigDevice = () => {
        if (deviceWidth > 996) {
            return true;
        } else {
            return false;
        }
    };

if(bigDevice()){
    return (
        <SafeAreaProvider style={styles.container}>
            <StatusBar
                animated={false}
                barStyle="light-content"
                hidden={false}
                backgroundColor="rgba(0,0,0,1)"
            ></StatusBar>
            <ScrollView contentContainerStyle={styles.innerContainer}>
                <Logo subHeader={"SignUp"} />
                <Form type='SignUp' />
                <View style={{ alignSelf: "center", marginBottom: 20, }}>
                    <TouchableOpacity onPress={back}>
                        <View>
                            <Text style={{ textAlign: "center", fontFamily: 'century-gothic', fontSize: 17 }}>Usuario existente?
                                <Text style={{ textAlign: "center", fontFamily: 'century-gothic', fontSize: 17, color: "rgba(140,0,255,1)" }}> Acceda</Text>
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.backgroundHidden}>
                <ImageBackground
                    style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}
                    imageStyle={styles.logoImageStyle}
                    source={require("../assets/images/Gradient_mmOEJc4.png")}
                >
                    <Text style={{ width: "100%", textAlign: "center", fontSize: 50, color: "#fff" }}>Bienvenido a CelFactor</Text>
                </ImageBackground>
            </View>
        </SafeAreaProvider>
    );
} else {
    return (
        <SafeAreaProvider style={styles.container}>
            <StatusBar
                animated={false}
                barStyle="light-content"
                hidden={false}
                backgroundColor="rgba(0,0,0,1)"
            ></StatusBar>
            <ScrollView contentContainerStyle={styles.innerContainer}>
                <Logo subHeader={"SignUp"} />
                <Form type='SignUp' />
                <View style={{ alignSelf: "center", marginBottom: 20,}}>
                    <TouchableOpacity onPress={Actions.pop}>
                        <View>
                            <Text style={{ textAlign: "center", fontFamily: 'century-gothic', fontSize: 17 }}>Usuario existente?
                                <Text style={{ textAlign: "center", fontFamily: 'century-gothic', fontSize: 17, color: "rgba(140,0,255,1)" }}> Acceda</Text>
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
}
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexGrow: 1,
    },
    innerContainer: {
        flexGrow: 3,
    },
    backgroundHidden: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        //ImageBackground: require('../assets/images/Gradient_mmOEJc4.png')
    }
});

export default SignUp;

