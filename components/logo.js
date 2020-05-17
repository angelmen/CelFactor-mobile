import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground, Text} from 'react-native';


export default class Logo extends Component{
    render(){
        return(
            <View style={styles.logoContainer}>
                <ImageBackground
                    style={styles.logoImageContainer}
                    imageStyle={styles.logoImageStyle}
                    source={require("../assets/images/Gradient_mmOEJc4.png")}
                >
                    <Text style={styles.logo}>CelFactor</Text>
                    <Text style={styles.subHeader}>{this.props.subHeader}</Text>
                </ImageBackground>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    logoContainer: {
        top: 0,
        left: 0,
        right: 0,
        height: "50%",
        maxHeight: 250
    },
    logoImageContainer: {
        alignSelf: "stretch",
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowColor: "rgba(74,144,226,1)",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        justifyContent: "center",
        height: "100%"
    },
    logoImageStyle: {},
    logo: {
        color: "rgba(255,255,255,1)",
        fontSize: 50,
        fontFamily: "calibri-regular",
        fontStyle: "italic",
        alignSelf: "center"
    },
    subHeader: {
        color: "rgba(255,255,255,1)",
        fontSize: 30,
        fontFamily: "calibri-regular",
        alignSelf: "center"
    },
})