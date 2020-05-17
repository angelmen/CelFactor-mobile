import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, StatusBar, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Form from '../components/form';
import Logo from '../components/logo';
import { Actions } from "react-native-router-flux";

function signup() {
    Actions['SignUp'].call();
}

function saludar() {
    alert("hola");
}



function LogIn(props) {
    var deviceWidth = Math.round(Dimensions.get('window').width)
    const smallDevice = () => {
        if (deviceWidth <= 480) {
            return true;
        } else {
            return false;
        }
    };
    const midDevice = () => {
        if (deviceWidth <= 996) {
            return true;
        } else {
            return false;
        }
    };
    const bigDevice = () => {
        if (deviceWidth > 996) {
            return true;
        } else {
            return false;
        }
    };

    if (bigDevice()) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated={false}
                    barStyle="light-content"
                    hidden={false}
                    backgroundColor="rgba(0,0,0,1)"
                ></StatusBar>
                <ScrollView contentContainerStyle={styles.innerContainer}>
                    <Logo subHeader={"LogIn"} />
                    <Form type='LogIn' />
                    <View style={{ alignSelf: "center", marginBottom: 20, }}>
                        <TouchableOpacity onPress={saludar}>
                            <View>
                                <Text style={{ textAlign: "center", fontFamily: 'century-gothic', fontSize: 17, color: "rgba(255,0,0,0.7)", marginBottom: 40 }}>Olvido su contraseña?</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={signup}>
                            <View>
                                <Text style={{ textAlign: "center", fontFamily: 'century-gothic', fontSize: 17 }}>Usuario nuevo?
                                <Text style={{ textAlign: "center", fontFamily: 'century-gothic', fontSize: 17, color: "rgba(140,0,255,1)" }}> Registrece</Text>
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
            </SafeAreaView>
        );
    } else if(smallDevice()){
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated={false}
                    barStyle="light-content"
                    hidden={false}
                    backgroundColor="rgba(0,0,0,1)"
                ></StatusBar>
                <ScrollView contentContainerStyle={styles.innerContainer}>
                    <Logo subHeader={"LogIn"} />
                    <Form type='LogIn' />
                    <View style={{ alignSelf: "center", marginBottom: 20, }}>
                        <TouchableOpacity onPress={saludar}>
                            <View>
                                <Text style={{ textAlign: "center", fontFamily: 'century-gothic', fontSize: 17, color: "rgba(255,0,0,0.7)", marginBottom: 40 }}>Olvido su contraseña?</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={signup}>
                            <View>
                                <Text style={{ textAlign: "center", fontFamily: 'century-gothic', fontSize: 17 }}>Usuario nuevo?
                                <Text style={{ textAlign: "center", fontFamily: 'century-gothic', fontSize: 17, color: "rgba(140,0,255,1)" }}> Registrece</Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
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

export default LogIn;

